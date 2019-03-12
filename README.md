# web2img
Takes webpage source code and returns rendered image of the web page.
Useful as web preview or sandbox if you run it on container.

# API Route
```GET /```

API Health Check

```POST /api/source```
```JSON
{
  "source": "<h1>Test2222</h1>"
}

```
This Request will return png of the rendered page:

![Screenshot](/example/example.png)


# How to use?
```bash
yarn
yarn start
```
# Config
Project configuration  is in ./config/prod.js

```javascript
module.exports = {
  port: "4008",
  tmpHtmlDir: ".\\tmp\\html\\",
  tmpImgDir: ".\\tmp\\img\\"
  }
```
