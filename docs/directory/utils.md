---
title: Utils
---

# Utils

Utils are utilization functions that are executed after the [middlewares](/directory/middlewares).

You can manipulate, validate, sanitize the body object with utils.

An example utility function:

```js
// detect content language
// only supported for "content" column

const LanguageDetect = require('languagedetect')
const lngDetector = new LanguageDetect()

module.exports = (data /* req.body */, { schema } /* Route object */) => {
  if (data) {
    if (schema.find((c) => c === 'content') && data.content != '') {
      // get limited part of the content for better performance
      const content = data.content.slice(0, 500)

      // node.js 1000 items processed in 1.277 secs (482 with a score > 0.2)
      const [[lng, precision]] = lngDetector.detect(content, 1)

      data.language = lng
    } else console.error("data or schema don't have a content")
  } else console.error('data is not defined')
  return data
}
```

The first parameter is `req.body` and the second paramter is `Route` object.

You can refer here to see the [route properties](/directory/routes#route-properties).
