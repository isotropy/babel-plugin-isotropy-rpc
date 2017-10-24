import template from "babel-template";

function templateConstructor(method) {
  return template(`LIB_Ws.${method}(RESOURCE, DATA);`);
}

export default {
  get: () => templateConstructor("get"),
  post: () => templateConstructor("post"),
  put: () => templateConstructor("put"),
  delete: () => templateConstructor("delete")
};
