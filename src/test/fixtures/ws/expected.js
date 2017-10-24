import _isotropyWs from "isotropy-lib-webservices";


async function getAllTodos() {
  return await _isotropyWs.get("http://www.poe3.com/postsAPI.getAllTodos()");
}
