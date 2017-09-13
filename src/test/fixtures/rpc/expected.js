import ispyRpc from "isotropy-lib-rpc";


async function getAllTodos() {
  return await ispyRpc.post("https://www.poe3.com/postsAPI.getAllTodos");
}
