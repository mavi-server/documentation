---
title: Routes
---

# Routes

If you configured previous steps now it is time to create some routes.

Route settings will generate your API with advanced query options, diverse controllers, useful middlewares, dynamic sub-queries, and more...

## Create routes config

Create a `routes` folder into your project root and add new files as `[route_name].js` or `[route_name].json`.
Route name will be used in api path, so you should give it a proper name. Each route file will be a collection of routes.

Example route config:

```js
// customers.js
module.exports = [
  {
    path: '/',
    method: 'get',
    controller: 'find', // Built-in controller. Custom controllers can be defined in `controllers` folder
    populate: ['status'], // Populates defined in `populate` folder
    middlewares: ['greetings'], // Middlewares are defined in `middlewares` folder
  },
  {
    path: '/',
    method: 'post',
    controller: 'create',
    populate: ['status'],
  },
  {
    path: '/count',
    method: 'get',
    controller: 'count',
  },
  {
    path: '/:id',
    method: 'get',
    controller: 'findOne',
    populate: ['status'],
  },
  {
    path: '/:id',
    method: 'put',
    controller: 'update',
    populate: ['status'],
  },
  {
    path: '/:id',
    method: 'delete',
    controller: 'delete',
    populate: ['status'],
  },
]
```

The object above will generate following api paths:

- [GET] - [api_base]/customers/
- [POST] - [api_base]/customers/
- [GET] - [api_base]/customers/
- [GET] - [api_base]/customers/:id
- [PUT] - [api_base]/customers/:id
- [DELETE] - [api_base]/customers/:id

## Route Properties

1. **path**: Route's virtual path
1. **method**: REST API methods. Accepted values are `delete`, `get`, `post`, `put`
1. **controller**: Path's controller function. Accepted values are `find`, `findOne`, `count`, `delete`, `update`, `create`, `upload`, `login`, `logout`, `register`. It can also used with options. Please refer to controllers page for more details.
1. **middleware**: Intercepts the request and carries response to the next segment. You can use multiple middlewares in an array (order is important). You can also put your functions in this array instead of strings.
1. **model**: The model this path will use.
1. **schema**: An array with the keys of the model columns. These are automatically extracted and you shouldn't change them.
1. **columns**: Represents selected columns for the response. As a default, non-private columns are inherited from your model.
1. **exclude**: It excludes specified columns from the `columns` property.
1. **populate**: Populates response data with the given columns. Each column should be defined in `populate` folder.
1. **utils**: Utility functions. Right now mavi doesn't have any built-in utils but you can define your own. Please refer utils page for details.
1. **serve**: Serves static files. It is used to serve any asset in your server.
1. **query**: You can control the incoming queries for each path. For instance you can lock the `sort` queries, you even can lock the `where` query's some spesific columns or assign them a default value, etc.
