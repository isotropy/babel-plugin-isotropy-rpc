import template from "babel-template";

export function post() {
  return template(`LIB_RPC.post(RESOURCE, DATA);`);
}

export function get() {
  return template(`LIB_RPC.get(RESOURCE, DATA);`);
}
