import $post from "../my-server";

async function getAllTodos() {
  return await $post.getAllTodos(1, 2, 3);
}
