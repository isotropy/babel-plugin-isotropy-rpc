import template from "babel-template";

export function post() {
  return template(`LIB_RPC.post(RESOURCE, DATA);`);
}
