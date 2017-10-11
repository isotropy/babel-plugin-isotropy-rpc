import should from "should";
import * as babel from "babel-core";
import fs from "fs";
import path from "path";
import transformToIsotropyWebservices from "../transform-to-isotropy-webservices";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install();

describe("isotropy-ast-analyzer-webservices", () => {
  function run([description, dir]) {
    const opts = {
      plugins: [
        [
          transformToIsotropyWebservices(),
          {
            projects: [
              {
                dir: "dist/test/fixtures",
                modules: [
                  {
                    source: "my-server",
                    url: "https://www.poe3.com"
                  }
                ]
              }
            ]
          }
        ],
        "transform-object-rest-spread"
      ],
      parserOpts: {
        sourceType: "module",
        allowImportExportEverywhere: true
      },
      babelrc: false
    };
    it(`${description}`, () => {
      const fixturePath = path.resolve(
        __dirname,
        "fixtures",
        dir,
        `fixture.js`
      );
      const expected = fs
        .readFileSync(__dirname + `/fixtures/${dir}/expected.js`)
        .toString();

      const babelResult = babel.transformFileSync(fixturePath, opts);
      const actual = babelResult.code + "\n";
      actual.should.deepEqual(expected);
    });
  }

  [
    ["rpc", "rpc"],
    ["rpc-args", "rpc-args"],
    ["rpc-deep", "rpc-deep"]
  ].forEach(test => run(test));
});
