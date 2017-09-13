import template from "babel-template";

export function rpc_post() {
  return template(`LIB_RPC.post(RESOURCE, DATA);`);
}
