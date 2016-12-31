async function someRemoteMethod(x, y) {
  const result = await isotropyRPC.invoke("myNS.someRemoteMethod", x, y);
}
