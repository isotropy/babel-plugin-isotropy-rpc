import _isotropyWs from "isotropy-lib-webservices";


async function getTodosOf(id = "0x8902") {
  return await _isotropyWs.post("http://www.poe3.com/postsAPI.getTodosOf(id)");
}
