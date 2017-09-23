import _isotropyRpc from "isotropy-lib-rpc";


async function getAllTodos() {
  return await _isotropyRpc.post("https://www.poe3.com/postsAPI.getAllTodos");
}
