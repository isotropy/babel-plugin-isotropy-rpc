WORK-IN-PROGRESS: Isotropy RPC Transpiler
=========================================

Do not use this yet.

The RPC transpiler converts configured methods into HTTP method calls.
The HTTP methods are exposed via the Isotropy calling convention, which is documented below. It's really cool, read on.

```javascript
const sum = await services.addTwoNumbers(10, 20);
//Gets converted into
const sum = await fetch("http://example.com/addTwoNumbers(10, 20)")

const sum = await services.addTwoNumbers(x, y);
//Gets converted into
const sum = await fetch("http://example.com/addTwoNumbers(x, y)?x=10y=20");
```

The code above depends on the following configuration

```json
{
  "isotropy": {
    "rpc": {
      "entryPoints": {
        "services": {
          "path": "services/svc",
          "prefix": "https://example.com/"
        }
      }
    }
  }
}
```

You can specify multiple entryPoints, if you have multiple services

```json
{
  "isotropy": {
    "rpc": {
      "entryPoints": {
        "services": {
          "path": "services/svc",
          "prefix": "https://example.com/svc/"
        },
        "authServices": {
          "path": "auth/svc",
          "prefix": "https://example.com/auth/"
        },

      }
    }
  }
}
```

```javascript
const sum = await services.addTwoNumbers(10, 20);
const isValid = await auth.authenticate("you", "yourpassword");
```


Advanced
--------

Isotropy RPC calling Convention

```bash
# returns 30
curl http://www.example.com/addTwoNumbers(10,20)
```

Invoke with parameters
```bash
curl http://www.example.com/addTwoNumbers(x, y)?x=10&y=20
```

Pass full objects as well
```bash
curl http://www.example.com/addTodo({ title:"bring milk", assignee: "me" })
```

Pass full objects via a parameter
```bash
curl http://www.example.com/addTodo(todo)?todo={ title:"bring milk", assignee: "me" })
```

Methods are callable via GET or POST and you can use most common Content-Types such as application/x-www-form-urlencoded, multipart/form-data or application/json.

Example of invoking a method via HTTP POST
```bash
curl --data "x=10&y=20" http://www.example.com/addTwoNumbers(x, y)
```
