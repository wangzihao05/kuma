package service

import (
	"context"
	"fmt"
	"time"

	"github.com/sethvargo/go-retry"
	"google.golang.org/grpc"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/api/system/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	"github.com/kumahq/kuma/pkg/core/resources/apis/system"
	"github.com/kumahq/kuma/pkg/core/resources/manager"
	"github.com/kumahq/kuma/pkg/core/resources/model"
	core_store "github.com/kumahq/kuma/pkg/core/resources/store"
	"github.com/kumahq/kuma/pkg/kds/util"
	"github.com/kumahq/kuma/pkg/multitenant"
	util_grpc "github.com/kumahq/kuma/pkg/util/grpc"
)

type GlobalKDSServiceServer struct {
	envoyAdminRPCs EnvoyAdminRPCs
	resManager     manager.ResourceManager
	instanceID     string
	mesh_proto.UnimplementedGlobalKDSServiceServer
}

func NewGlobalKDSServiceServer(
	envoyAdminRPCs EnvoyAdminRPCs,
	resManager manager.ResourceManager,
	instanceID string,
) *GlobalKDSServiceServer {
	return &GlobalKDSServiceServer{
		envoyAdminRPCs: envoyAdminRPCs,
		resManager:     resManager,
		instanceID:     instanceID,
	}
}

var _ mesh_proto.GlobalKDSServiceServer = &GlobalKDSServiceServer{}

func (g *GlobalKDSServiceServer) StreamXDSConfigs(stream mesh_proto.GlobalKDSService_StreamXDSConfigsServer) error {
	return g.streamEnvoyAdminRPC(ConfigDumpRPC, g.envoyAdminRPCs.XDSConfigDump, stream, func() (util_grpc.ReverseUnaryMessage, error) {
		return stream.Recv()
	})
}

func (g *GlobalKDSServiceServer) StreamStats(stream mesh_proto.GlobalKDSService_StreamStatsServer) error {
	return g.streamEnvoyAdminRPC(StatsRPC, g.envoyAdminRPCs.Stats, stream, func() (util_grpc.ReverseUnaryMessage, error) {
		return stream.Recv()
	})
}

func (g *GlobalKDSServiceServer) StreamClusters(stream mesh_proto.GlobalKDSService_StreamClustersServer) error {
	return g.streamEnvoyAdminRPC(ClustersRPC, g.envoyAdminRPCs.Clusters, stream, func() (util_grpc.ReverseUnaryMessage, error) {
		return stream.Recv()
	})
}

func (g *GlobalKDSServiceServer) streamEnvoyAdminRPC(
	rpcName string,
	rpc util_grpc.ReverseUnaryRPCs,
	stream grpc.ServerStream,
	recv func() (util_grpc.ReverseUnaryMessage, error),
) error {
	zone, err := util.ClientIDFromIncomingCtx(stream.Context())
	if err != nil {
		return err
	}
	clientID := ClientID(stream.Context(), zone)
	core.Log.Info("Envoy Admin RPC stream started", "rpc", rpcName, "clientID", clientID)
	rpc.ClientConnected(clientID, stream)
	if err := g.storeStreamConnection(stream.Context(), zone, rpcName, g.instanceID); err != nil {
		return err
	}
	defer func() {
		rpc.ClientDisconnected(clientID)
		// stream.Context() is cancelled here, we need to use another ctx
		ctx := multitenant.CopyIntoCtx(stream.Context(), context.Background())
		if err := g.storeStreamConnection(ctx, zone, rpcName, ""); err != nil {
			core.Log.Error(err, "could not clear stream connection information in ZoneInsight", "rpc", rpcName, "clientID", clientID, "rpc", rpcName)
		}
	}()
	for {
		resp, err := recv()
		if err != nil {
			return err
		}
		core.Log.V(1).Info("Envoy Admin RPC response received", "rpc", rpc, "clientID", clientID, "requestId", resp.GetRequestId())
		if err := rpc.ResponseReceived(clientID, resp); err != nil {
			return err
		}
	}
}

func (g *GlobalKDSServiceServer) storeStreamConnection(ctx context.Context, zone string, rpcName string, instance string) error {
	key := model.ResourceKey{Name: zone}

	// wait for Zone to be created, only then we can create Zone Insight
	err := retry.Do(
		ctx,
		retry.WithMaxRetries(30, retry.NewConstant(1*time.Second)),
		func(ctx context.Context) error {
			return retry.RetryableError(g.resManager.Get(ctx, system.NewZoneResource(), core_store.GetBy(key)))
		},
	)
	if err != nil {
		return err
	}

	zoneInsight := system.NewZoneInsightResource()
	return manager.Upsert(ctx, g.resManager, key, zoneInsight, func(resource model.Resource) error {
		if zoneInsight.Spec.EnvoyAdminStreams == nil {
			zoneInsight.Spec.EnvoyAdminStreams = &v1alpha1.EnvoyAdminStreams{}
		}
		switch rpcName {
		case ConfigDumpRPC:
			zoneInsight.Spec.EnvoyAdminStreams.ConfigDumpGlobalInstanceId = instance
		case StatsRPC:
			zoneInsight.Spec.EnvoyAdminStreams.StatsGlobalInstanceId = instance
		case ClustersRPC:
			zoneInsight.Spec.EnvoyAdminStreams.ClustersGlobalInstanceId = instance
		}
		return nil
	}, manager.WithConflictRetry(100*time.Millisecond, 10)) // we need retry because zone sink or other RPC may also update the insight.
}

func ClientID(ctx context.Context, zone string) string {
	tenantID, ok := multitenant.TenantFromCtx(ctx)
	if !ok {
		return zone
	}
	return fmt.Sprintf("%s:%s", zone, tenantID)
}
