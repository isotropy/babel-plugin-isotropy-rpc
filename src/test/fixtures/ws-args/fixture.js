import * as $post from "../my-server";

async function getTodosOf(id = "0x8902") {
  return await $post.postsAPI.getTodosOf(id);
}
