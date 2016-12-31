Call a remote method in a namespace

```javascript
async function someRemoteMethod(x, y) {
  await isotropyRPC.myNS.someRemoteMethod(x, y);
}
```
