import ispyRpc from "isotropy-lib-rpc";


async function getAllDones() {
  return await ispyRpc.post("https://www.poe3.com/legacyServer.backUpLogs.postsAPI.getAllDones");
}
