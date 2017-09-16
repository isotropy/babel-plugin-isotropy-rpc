import getAnalyzers from "../../isotropy-ast-analyzer-rpc/dist";
import * as mapper from "./mappers";
import * as template from "./templates";
import * as t from "babel-types";
import clean from "./utils/node-cleaner";
import pathFinder from "./utils/path-finder";

export default function(opts) {
  debugger;
  let _analysis;

  function analyze(fn, path, state) {
    const analysis = fn(path, state);
    if (analysis !== undefined) {
      _analysis = analysis.value;
    }
  }

  let analyzers;
  const libRpcIdentifier = t.identifier("ispyRpc");
  const libRpcSource = t.StringLiteral("isotropy-lib-rpc");
  const baseUrl = "https://www.poe3.com/";

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
            path.replaceWith(
              t.importDeclaration(
                [t.importDefaultSpecifier(libRpcIdentifier)],
                libRpcSource
              )
            );
            path.skip();
          }
        },

        // AssignmentExpression(path, state) {
        //   analyze(analyzers.write.analyzeAssignmentExpression, path, state);
        //   if (!_analysisState) return;
        //   path.replaceWith(
        //     t.awaitExpression(
        //       template[_analysis.type]()(
        //         mapper[_analysis.type](
        //           clean(_analysis),
        //           libRpcIdentifier,
        //           basePath
        //         )
        //       ).expression
        //     )
        //   );
        // },

        CallExpression: {
          exit(path, state) {
            // analyze(analyzers.analyze.analyzeCallExpression, path, state);
            const analysis = analyzers.analyze.analyzeCallExpression(
              path,
              state
            ).value;
            if (!analysis) return;
            const { resource, data } = pathFinder(clean(analysis), baseUrl);
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
