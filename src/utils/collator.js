import * as t from "babel-types";
import generate from "babel-generator";

export default function(path, cleanalysis, remoteUrl) {
  remoteUrl = remoteUrl.endsWith("/") ? remoteUrl : remoteUrl + "/";

  const analyzeArgs = argArray =>
    argArray.reduce(
      (acc, cur) =>
        cur.type === "BooleanLiteral" ||
          cur.type === "NumericLiteral" ||
          (cur.type === "StringLiteral" && !cur.value.includes(" "))
          ? {
              simpleArgs: acc.simpleArgs + ", " + generate(cur).code,
              complexArgs: acc.complexArgs
            }
          : cur.type === "Identifier"
            ? {
                simpleArgs: acc.simpleArgs + ", " + generate(cur).code,
                complexArgs: acc.complexArgs
              }
            : (() => {
                const argIdentifier = path.scope.generateUidIdentifier("arg")
                  .name;
                return {
                  simpleArgs: acc.simpleArgs + ", " + argIdentifier,
                  complexArgs: acc.complexArgs.concat({
                    [argIdentifier]: generate(cur).code
                  })
                };
              })(),
      { simpleArgs: "", complexArgs: [] }
    );

  const { remoteResource, args } = cleanalysis.expressions.reduce(
    (acc, cur, i) =>
      cur.type === "MemberExpression"
        ? cleanalysis.expressions[i + 1] &&
            "CallExpression" === cleanalysis.expressions[i + 1].type
          ? (() => {
              const { simpleArgs, complexArgs } = analyzeArgs(
                cleanalysis.expressions[i + 1].arguments
              );
              return {
                remoteResource:
                  acc.remoteResource +
                    "." +
                    cur.memberName +
                    `(${simpleArgs.substring(2)})`,
                args: acc.args.concat(complexArgs)
              };
            })()
          : {
              remoteResource: acc.remoteResource + "." + cur.memberName,
              args: acc.args
            }
        : { remoteResource: acc.remoteResource, args: acc.args },
    { remoteResource: "", args: [] }
  );

  return {
    resource: t.stringLiteral(remoteUrl + remoteResource.substring(1)),
    data: args
  };
}
