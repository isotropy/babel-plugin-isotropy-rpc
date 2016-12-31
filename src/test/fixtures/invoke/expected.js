async function someRemoteMethod(x, y) {
  const result = await isotropyRPC.invoke("someRemoteMethod", x, y);
}
