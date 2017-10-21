import * as t from "babel-types";

export function post(resource, data, libRpc) {
  return {
    RESOURCE: resource,
    DATA: data,
    LIB_RPC: libRpc
  };
}

export function get(resource, data, libRpc) {
  return {
    RESOURCE: resource,
    DATA: data,
    LIB_RPC: libRpc
  };
}
