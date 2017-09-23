import _isotropyRpc from "isotropy-lib-rpc";


async function getAllDones() {
  return await _isotropyRpc.post("https://www.poe3.com/legacyServer.backUpLogs.postsAPI.getAllDones");
}
