import _isotropyWs from "isotropy-lib-webservices";


async function getAllTodos() {
  return await _isotropyWs.post("http://www.poe3.com/getAllTodos(1, 2, 3)");
}
