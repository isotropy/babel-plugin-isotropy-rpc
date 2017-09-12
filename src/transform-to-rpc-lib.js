import getAnalyzers from "../../isotropy-ast-analyzer-rpc/dist";
import * as mapper from "./mappers";
import * as template from "./templates";
import * as t from "babel-types";
import clean from "./utils/node-cleaner";
import stackCollection from "./utils/stack-collection"

export default function(opts) {
  let _analysis,
    _analysisState,
    _importAnalysis = false;

  function analyze(fn, path, state) {
    _analysisState = false;
    const analysis = fn(path, state);
    path.skip();
    if (analysis !== undefined) {
      _analysis = analysis.value;
      _analysisState = true;
    }
    if (analysis === true) _analysisState = true;
  }

  let analyzers;
  const libRpcIdentifier = t.identifier("ispyRpc");
  const libRpcSource = t.StringLiteral("isotropy-lib-rpc");
  const basePath = t.stringLiteral("https://www.poe3.com");

  return {
    plugin: {
      pre() {
        analyzers = getAnalyzers();
      },
      visitor: {
        ImportDeclaration(path, state) {
          analyze(analyzers.meta.analyzeImportDeclaration, path, state);
          if (_importAnalysis) return;
          path.insertBefore([
            t.importDeclaration(
              [t.importDefaultSpecifier(libRpcIdentifier)],
              libRpcSource
            )
          ]);
          _importAnalysis = true;
          path.skip;
        },

        AssignmentExpression(path, state) {
          analyze(analyzers.write.analyzeAssignmentExpression, path, state);
          if (!_analysisState) return;
          path.replaceWith(
            t.awaitExpression(
              template[_analysis.type]()(
                mapper[_analysis.type](
                  clean(_analysis),
                  libRpcIdentifier,
                  basePath
                )
              ).expression
            )
          );
        },

        CallExpression(path, state) {
          analyze(analyzers.read.analyzeCallExpression, path, state);
          if (!_analysisState) return;
          path.replaceWith(
            t.awaitExpression(
              template[_analysis.type]()(
                mapper[_analysis.type](
                  clean(_analysis),
                  libRpcIdentifier,
                  basePath
                )
              ).expression
            )
          );
        }
      }
    }
  };
}
