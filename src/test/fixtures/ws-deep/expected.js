import _isotropyWs from "isotropy-lib-webservices";


async function getAllDones() {
  const a = 1;
  return await _isotropyWs.get("http://www.poe3.com/legacyServer.backUpLogs(a, 2).postsAPI.getAllDones(true)");
}
