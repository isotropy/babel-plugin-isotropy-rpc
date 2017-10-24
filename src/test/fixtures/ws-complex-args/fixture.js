import * as myServer from "../my-server";

async function getTodosOf() {
  return await myServer.postsAPI.getTodosOf("Hello darkness");
}
