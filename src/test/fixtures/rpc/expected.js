import _isotropyRpc from "isotropy-lib-webservices";


async function getAllTodos() {
  return await _isotropyRpc.get("http://www.poe3.com/postsAPI.getAllTodos()");
}
