import ispyRpc from "isotropy-lib-rpc";


async function getTodosOf(id = "0x8902") {
  return await ispyRpc.post("https://www.poe3.com/postsAPI.getTodosOf", id);
}
