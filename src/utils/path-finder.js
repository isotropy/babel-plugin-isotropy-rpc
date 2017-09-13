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

// const resource = cleanalysis.collection
//   ? t.memberExpression(
//       t.identifier(cleanalysis.collection),
//       t.identifier(cleanalysis.function)
//     )
//   : cleanalysis.collectionArray.reduce(
//       (acc, cur, index) =>
//         index === 0
//           ? t.identifier(cur)
//           : t.memberExpression(acc, t.identifier(cur)),
//       {}
//     );
