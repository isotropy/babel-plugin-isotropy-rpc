import * as t from "babel-types";

function mapper(resource, data, libWS) {
  return {
    RESOURCE: resource,
    DATA: data,
    LIB_Ws: libWS
  };
}

export default {
  get: (resource, data, libWS) => mapper(resource, data, libWS),
  post: (resource, data, libWS) => mapper(resource, data, libWS),
  put: (resource, data, libWS) => mapper(resource, data, libWS),
  delete: (resource, data, libWS) => mapper(resource, data, libWS)
};
