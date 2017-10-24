import _isotropyRpc from "isotropy-lib-webservices";


async function getTodosOf(id = "0x8902") {
  return await _isotropyRpc.get("http://www.poe3.com/postsAPI.getTodosOf(id)");
}
