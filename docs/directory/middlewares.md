---
title: Middlewares
---

# Middlewares

Middlewares can be used as a layer before reaching your controller logic. Their array order is important and the function logic should return `next()` if it succeed.

## Built-in middlewares

Mavi has two built-in middlewares

1. **authorization**: The client needs a token to see the resource
1. **is-owner**: The client's token needs to match with collection's ownership. To use this middleware, the collection has to define the `user` column in its model like below:

   ```js
   // models/posts.json
   {
    .
    .
    .,
    "user": {
        "type": "integer",
        "constraints": ["notNullable"],
        "references": "users.id",
        "comment": 'author',
    },
    .
    .
    .
   }
   ```

## Example

```json
// posts.json
[
  {
    "path": "/",
    "method": "post",
    "controller": "create",
    "middlewares": ["authorization", "published"],
    "utils": ["detect-language"],
    "populate": ["bookmark", "user", "community", "thumbnail"]
  }
]
```

This route will create a post collection if user is logged in and the given post is published.

The `authorization` middleware is built-in, `published` is a custom middleware.

You can see this pretty basic middleware below:

```js
// published.js
module.exports = (req, res, next) => {
  if (!req.body.published) {
    req.body.published = true
  }

  next()
}
```
