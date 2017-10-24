import _isotropyRpc from "isotropy-lib-webservices";


async function getTodosOf() {
  return await _isotropyRpc.get("http://www.poe3.com/postsAPI.getTodosOf(_arg)", [{ "_arg": "\"Hello darkness\"" }]);
}
