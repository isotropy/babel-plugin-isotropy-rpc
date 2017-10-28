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
                    source: "dist/test/fixtures/my-server",
                    remoteUrl: "http://www.poe3.com",
                    httpMethods: {
                      get: ["$get"],
                      post: ["$post"]
                    }
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
    ["ws", "ws"],
    ["ws-call-missing-methods", "ws-call-missing-methods"],
    ["ws-args", "ws-args"],
    ["ws-simple-args", "ws-simple-args"],
    ["ws-complex-args", "ws-complex-args"],
    ["ws-deep", "ws-deep"],
    ["ws-default-method", "ws-default-method"],
    ["ws-get", "ws-get"]
  ].forEach(test => run(test));
});
