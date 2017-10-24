import _isotropyWs from "isotropy-lib-webservices";


async function getTodosOf() {
  return await _isotropyWs.get("http://www.poe3.com/postsAPI.getTodosOf(_arg)", [{ "_arg": "\"Hello darkness\"" }]);
}
