import _isotropyWs from "isotropy-lib-webservices";


async function getAllTodos() {
  const a = 10;
  return await _isotropyWs.get("http://www.poe3.com/getAllTodos(1, a)");
}
