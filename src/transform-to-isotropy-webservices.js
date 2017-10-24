import getAnalyzers from "isotropy-ast-analyzer-webservices";
import mapper from "./mappers";
import template from "./templates";
import * as t from "babel-types";
import * as babel from "babel-core";
import clean from "./utils/node-cleaner";
import collator from "./utils/collator";

export default function() {
  let analyzers = getAnalyzers();
  let libWsIdentifier;
  const libWsSource = t.StringLiteral("isotropy-lib-webservices");

  const visitor = {};

  visitor.ImportDeclaration = {
    exit(path, state) {
      const analysis = analyzers.meta.analyzeImportDeclaration(path, state);
      if (!analysis) return;
      libWsIdentifier = t.identifier(
        path.scope.generateUidIdentifier("isotropyWs").name
      );
      path.replaceWith(
        t.importDeclaration(
          [t.importDefaultSpecifier(libWsIdentifier)],
          libWsSource
        )
      );
      path.skip();
    }
  };

  visitor.CallExpression = function(path, state) {
    const analysis = analyzers.analyze.analyzeCallExpression(path, state).value;
    if (!analysis) return;
    const { resource, data } = collator(
      path,
      clean(analysis),
      analysis.remoteUrl
    );
    let dataAST = babel.transform(JSON.stringify(data)).ast.program.body[0];
    dataAST = dataAST.expression.elements.length > 0 ? dataAST : null;
    path.replaceWith(
      template[analysis.httpMethod]()(
        mapper[analysis.httpMethod](resource, dataAST, libWsIdentifier)
      ).expression
    );
    path.stop();
  };

  return { visitor };
}
