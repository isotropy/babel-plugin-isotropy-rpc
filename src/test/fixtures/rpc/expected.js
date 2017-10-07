import _isotropyRpc from "isotropy-lib-webservices";


async function getAllTodos() {
  return await _isotropyRpc.post("https://www.poe3.com/postsAPI.getAllTodos");
}
