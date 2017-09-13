import should from "should";
import * as babel from "babel-core";
import fs from "fs";
import path from "path";
import makePlugin from "../transform-to-rpc-lib";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install();

describe("isotropy-ast-analyzer-rpc", () => {
  function run([description, dir, opts]) {
    it(`${description}`, () => {
      const fixturePath = path.resolve(
        __dirname,
        "fixtures",
        dir,
        `fixture.js`
      );
      const outputPath = path.resolve(__dirname, "fixtures", dir, `output.js`);
      const expected = fs
        .readFileSync(__dirname + `/fixtures/${dir}/expected.js`)
        .toString();
      const pluginInfo = makePlugin(opts);

      const babelResult = babel.transformFileSync(fixturePath, {
        plugins: [
          [
            pluginInfo.plugin,
            {
              libRpcIdentifier: "ispyRpc",
              rpcModules: {
                todosServerModule: "./dist/test/fixtures/my-server"
              }
            }
          ],
          "transform-object-rest-spread"
        ],
        parserOpts: {
          sourceType: "module",
          allowImportExportEverywhere: true
        },
        babelrc: false
      });
      const actual = babelResult.code + "\n";
      actual.should.deepEqual(expected);
    });
  }

  const tests = [
    ["rpc", "rpc"],
    ["rpc-args", "rpc-args"],
    ["rpc-deep", "rpc-deep"]
  ];

  for (const test of tests) {
    debugger;
    run(test);
  }
});
