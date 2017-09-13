import * as t from "babel-types";

export function rpc_post(resource, data, libRpc) {
  return {
    RESOURCE: resource,
    DATA: data,
    LIB_RPC: libRpc
  };
}
