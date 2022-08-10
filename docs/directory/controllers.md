---
title: Controllers
---

# Controllers

Controllers contain a set of methods that are reached by the client according to the requested route. These methods are specified below.

You can also define your own controllers too! Just create a `controllers` folder then create a `controller_name.js` file. They just have `req` and `res` parameters.

An example:

```js
// controllers/get-latest.js
module.exports = (req, res) => {
  // this.req.queryBuilder is a knex query builder
  // See more https://knexjs.org/guide/query-builder.html

  // This will select all columns of the model and will only bring the first result.
  // The model is automatically extracted by the route you use this controller in.
  return this.req.queryBuilder.first('*').orderBy('id', 'desc')
}
```

```js
// routes/customers.js
module.exports = [
  {
    path: '/first-customer',
    method: 'get',
    controller: 'get-latest', // controller is used here
  },
  {
    path: '/first-customer',
    method: 'get',
    // you could also use the function here
    controller: (req, res) => {
      return this.req.queryBuilder.first('*').orderBy('id', 'desc')
    },
  },
]
```

::: tip
Controller are executed after the middlewares.
:::

## find

Find collections.

## findOne

Find one collection. Requires `id` as a parameter.

## count

Count collections.

## delete

Delete one collection. Required `id` as a parameter.

## update

Update one collection. Requires `id` as a parameter. Also needs `req.body` object.

## create

Create one collection. Needs `req.body` object

## upload

Upload any file to the server. Requires `folder` as a parameter. Also you can easily serve uploaded files if you want to.

Example usage;

```js
// routes/uploads.js
module.exports = [
  // upload configuration:
  {
    path: '/:folder', // For this example folder will be `/uploads`
    method: 'post',
    controller: [
      'upload',
      {
        accept: 'image', // Accepted mime types. Can a be comma separated string.
        folders: ['avatars', 'thumbnails'], // Accepted folder names from parameter
        maxFileSize: 5242880, // Max uploadable file size
      },
    ],
    middlewares: ['authorization'], // only logged in users can upload
  },
  // serve configuration:
  {
    path: '/',
    method: 'get',
    serve: {
      // see more: https://expressjs.com/en/4x/api.html#express.static
      folder: 'uploads', // Folder path to be served. Path is relative to the project root.
      dotfiles: 'ignore',
      etag: false,
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg'],
      maxAge: '1d',
    },
  },
]
```

## Auth controllers

Auth logic for your application. You can take advantage of `is-owner` and `authorization` middlewares to use with registered users.

To use these controllers first you need a `users.js` model like below:

```js
// models/users.js
module.exports = {
  id: { type: 'increments', constraints: ['primary'] },
  username: { type: 'string', constraints: ['unique'], maxlength: 18 },
  email: { type: 'string', constraints: ['unique'], maxlength: 100 },
  fullname: { type: 'string', maxlength: 100 },
  password: { type: 'string', private: true },
  avatar: { type: 'text' },
  token: { type: 'text', private: true },
  refresh: { type: 'text', private: true },
  updated_at: { type: 'timestamp', useTz: true, precision: 6 },
  created_at: { type: 'timestamp', useTz: true, precision: 6 },
}
```

### login

Login as a user.

When you logged in, the server should evaluate your token headers for each request.

Required headers from client side: `x-access-token`, `x-refresh-token`

Login method requires a body with `username` or `email`, and `password`.
Returns a payload if credentials are correct.

```js
// returned payload if successful
{
  id, username, email, avatar, fullname, token, refresh
}
```

After this payload, you should set `token` and `refresh` tokens for your request's headers in your client http logic.

It would be something like;

```js
// client side - an HTTP interceptor
// sets header on each request
$http.onRequest((req) => {
  req.headers.set('x-access-token', payload.token)
  req.headers.set('x-refresh-token', payload.refresh)
})
```

### logout

It clears user tokens from server.

If the user's token has expired, it automatically will refresh. But if refresh token has expired, it will be logged out.

---

User should handle the client side refresh logic.

If server sends `x-access-token` from headers, that means it is the new/refreshed token.

You can do something like;

```js
// client side - an HTTP interceptor
// sets incoming response header on each response
$http.onResponse((req, options, res) => {
  const token = res.headers.get('x-access-token')

  if (token) {
    options.headers.set('x-access-token', token) // renew token
  }
})
```

### register

Register new user.

Requires a body with `fullname`, `username`, `avatar (optional)`, `email`, `password`

After a successful register, you will get the same payload as in the `login` controller.
