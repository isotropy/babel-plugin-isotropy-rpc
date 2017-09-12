import should from "should";
import * as babel from "babel-core";
import fs from "fs";
import path from "path";
import makePlugin from "../fs-plugin";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install();

describe("isotropy-ast-analyzer-fs", () => {
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
              filesystemModules: {
                todosFsModule: "./dist/test/fixtures/my-fs"
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
    ["create-file", "create-file"],
    ["read-file", "read-file"],
    ["update-file", "update-file"],
    ["get-files", "get-files"],
    ["get-files-recursive", "get-files-recursive"],
    ["move-file", "move-file"],
    ["move-dir", "move-dir"],
    ["delete-file", "delete-file"],
    ["delete-dir", "delete-dir"]
  ];

  for (const test of tests) {
    run(test);
  }
});
