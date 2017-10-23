import * as myServer from "../my-server";

async function getAllDones() {
  const a = 1;
  return await myServer.legacyServer.backUpLogs(a, 2).postsAPI.getAllDones();
}
