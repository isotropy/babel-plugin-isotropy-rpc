import _isotropyRpc from "isotropy-lib-webservices";


async function getAllDones() {
  return await _isotropyRpc.post("https://www.poe3.com/legacyServer.backUpLogs.postsAPI.getAllDones");
}
