// Generated by tools/resource-gen.
// Run "make generate" to update this file.

// nolint:whitespace
package v1alpha1

import (
	common_api "github.com/kumahq/kuma/api/common/v1alpha1"
	core_model "github.com/kumahq/kuma/pkg/core/resources/model"
)

func (x *MeshRateLimit) GetTargetRef() common_api.TargetRef {
	return x.TargetRef
}

func (x *From) GetTargetRef() common_api.TargetRef {
	return x.TargetRef
}

func (x *From) GetDefault() interface{} {
	return x.Default
}

func (x *MeshRateLimit) GetFromList() []core_model.PolicyItem {
	var result []core_model.PolicyItem
	for i := range x.From {
		item := x.From[i]
		result = append(result, &item)
	}
	return result
}
