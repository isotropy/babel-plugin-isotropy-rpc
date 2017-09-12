import * as t from "babel-types";

export function rpc_post(resource, data, libRpc, basePath) {
  return {
    LIB_RPC: libRpc,
    RESOURCE: resource,
    BASE_PATH: basePath,
    DATA: data
  };
}
