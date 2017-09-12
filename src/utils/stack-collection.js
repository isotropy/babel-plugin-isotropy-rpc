import * as t from "babel-types";

export default function(cleanalysis) {
  const data = cleanalysis.args ? cleanalysis.args : null;
  const resource = cleanalysis.collection
    ? t.memberExpression(
        t.identifier(cleanalysis.collection),
        t.identifier(cleanalysis.function)
      )
    : cleanalysis.collectionArray.reduce(
        (acc, cur, index) =>
          index === 0
            ? t.identifier(cur)
            : t.memberExpression(acc, t.identifier(cur)),
        {}
      );
  return { resource, data };
}
