import * as t from "babel-types";

export default function(cleanalysis, remoteUrl) {
  const data = cleanalysis.args
    ? cleanalysis.expressions.find(expr => (expr.arguments ? true : false))
        .arguments
    : null;

  remoteUrl = remoteUrl.endsWith("/") ? remoteUrl : remoteUrl + "/";

  const resource = t.stringLiteral(
    remoteUrl +
      cleanalysis.expressions
        .reduce(
          (acc, cur) => (cur.memberName ? acc + "." + cur.memberName : acc),
          ""
        )
        .substring(1)
  );
  return { resource, data };
}
