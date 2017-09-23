import getAnalyzers from "../../isotropy-ast-analyzer-rpc/dist";
import * as mapper from "./mappers";
import * as template from "./templates";
import * as t from "babel-types";
import clean from "./utils/node-cleaner";
import pathFinder from "./utils/path-finder";

export default function(opts) {
  let analyzers;
  let libRpcIdentifier;
  const libRpcSource = t.StringLiteral("isotropy-lib-rpc");

  return {
    plugin: {
      pre() {
        analyzers = getAnalyzers();
      },
      visitor: {
        ImportDeclaration: {
          exit(path, state) {
            const analysis = analyzers.meta.analyzeImportDeclaration(
              path,
              state
            );
            if (!analysis) return;
            libRpcIdentifier = t.identifier(
              path.scope.generateUidIdentifier("isotropyRpc").name
            );
            path.replaceWith(
              t.importDeclaration(
                [t.importDefaultSpecifier(libRpcIdentifier)],
                libRpcSource
              )
            );
            path.skip();
          }
        },

        CallExpression: {
          exit(path, state) {
            const analysis = analyzers.analyze.analyzeCallExpression(
              path,
              state
            ).value;
            if (!analysis) return;
            const { resource, data } = pathFinder(
              clean(analysis),
              analysis.module
            );
            path.replaceWith(
              template[analysis.type]()(
                mapper[analysis.type](resource, data, libRpcIdentifier)
              ).expression
            );
            path.skip();
          }
        }
      }
    }
  };
}
