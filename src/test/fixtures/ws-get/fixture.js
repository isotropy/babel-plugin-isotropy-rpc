import $get from "../my-server";

async function getAllTodos() {
  const a = 10;
  return await $get.getAllTodos(1, a);
}
