import * as t from "babel-types";

export default function(cleanalysis, baseUrl) {
  const data = cleanalysis.args ? cleanalysis.args : null;
  baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
  const resource = cleanalysis.collection
    ? t.stringLiteral(
        baseUrl + cleanalysis.collection + "." + cleanalysis.function
      )
    : t.stringLiteral(
        baseUrl +
          cleanalysis.collectionArray.reduce((acc, cur) => acc + "." + cur) +
          "." +
          cleanalysis.function
      );
  return { resource, data };
}
