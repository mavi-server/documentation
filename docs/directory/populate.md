---
title: Populate
---

# Populate

If you created your routes, now you can advance it with the populate options. It will define a sub query configurations for the parent's data.

## Configurations

In models chapter we created `customers.js` and `statuses.js` model files. `Customers` model has `status` column that references to primary key (`id`) of the `Statuses` model.

In routes chapter we created `customers.js` route collection. Some of the paths have `populate` property to populate `status` column.

But without defining a `status` configuration, values can't be populated.

## Bring deep level data

Create a `populate` folder into your project root and add `status.js` or `status.json`.

Example populate file:

```js
// populate/status.js
module.exports = {
  select: 'status',
  from: 'statuses',
  controller: 'object',
  columns: ['id', 'state', 'lastSeen', 'updated_at', 'created_at'], // default is all as `*`
  // exclude: ['id'] // you can also exclude columns
}
```

When you use this `{ populate: ["status"] }` in one of your `customers` routes,
you will get the deep level data according to your populate configurations.

The config above will get the id of `customer.status` then will bind the results to it.

```js
// response: a customer - from
{
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  gender: 'male',
  status: 1
}
```

```js
// response: a customer - to
{
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  gender: 'male',
  status: {
    id: 1,
    state: 'active',
    lastSeen: '27.02.2022',
  }
}
```

There are many useful populate options. You can explore them below.

## Populate Properties:

1. **select**: Select `alias column` or `real column`. For instance; if you were select `stat` instead of `status`, it will create a new property for the parent object, because it is not defined in the model. But you will have to feed the `stat` with a parameter to return and bind value(s).
2. **on**: Context column. For instance; if you were select an `alias column`, you can feed it from here. This option has to be a `real column` name and it's value will be used as a subquery parameter.
3. **from**: Which model the subquery will use?
4. **type**: Populate type. Available: `count`, `object`, `array`, `token-reference`, `array-reference`
5. **controller**: Equal to `type` option.
6. **columns**: Represents selected columns for the response. As a default, non-private columns are inherited from your model.
7. **exclude**: It excludes specified columns from the `columns` property.
8. **returning**: Only use it with `token-reference` sub-controller. Any existing column can be returned. Also `*` can be used for returning all. Custom column selection is not supported yet.
9. **populate**: Populates response data with the given columns. Each column should be defined in `populate` folder. _**Caution!** as long as it goes deep, the response time will increase accordingly._
10. **query**: This option is the same with routes's query, but here it is just `read-only`. Meaning, it is not evaluates incoming queries for the sub-query;
    it is only used for assigning default query values, or define special where queries.

For example: `query: { sort: "id-desc", where: "type-eq-#context" }`

Here the sub-query will sort as descending order and use where query. (The `#context` is a special variable and refers to the `context` property)

11. **context**: It is the parent model's name and is assigned automatically. You needn't change it in most cases.

### Special values for dynamic sub-queries

1. `#context` value can be used with `where` query. It refers to the `context` property

   ```js
   // #context value example
   {
     "select": "bookmarkCount",
     "from": "bookmarks",
     "on": "user",
     "query": {
       "where": "type-eq-#context"
     },
     "controller": "count"
   }
   ```

1. `row.column_name` can be used with `select`, `from` and `overwrite`. It refers to the parent data.

   ```js
   // row[column_name] value example
   {
     "select": "references",
     "from": "row.type",
     "controller": "object",
     "overwrite": {
       "isFollowing": "row.id"
     },
     "populate": ["icon"]
   }

   ```

## Examples

Some examples to give you an idea of how populate configurations can be used.

```js
// populate/bookmarks.json
{
  "select": "bookmark",
  "from": "bookmarks",
  "on": "references",
  "query": {
    "where": "type-eq-#context"
  },
  "controller": "token-reference", // uses logged in user's id
  "returning": "id" // returns bookmark id
}
```

```js
// populate/bookmarkCount.json
{
  "select": "bookmarkCount",
  "from": "bookmarks",
  "on": "user",
  "query": {
    "where": "type-eq-#context"
  },
  "controller": "count"
}
```

```js
// populate/tags.json
{
  "select": "tags",
  "from": "tags",
  "controller": "array-reference" // eg. tags: [1,2,5] will populated by their ids.
}
```

```js
// populate/channel.json
{
"select": "channel",
"from": "channels",
"controller": "object",
"exclude": ["updated_at"]
}
```

```js
// populate/commentCount.json
{
  "select": "commentCount",
  "from": "threads",
  "on": "user",
  "controller": "count",
  "query": {
    "where": "title-null" // don't count title-null ones
  }
}
```

```js
// populate/community.json
{
  "select": "community",
  "from": "communities",
  "controller": "object",
  "exclude": ["updated_at"],
  "populate": ["isFollowing", "icon"] // 2. level populate. It will go deeper as it gets.
}
```

```js
// populate/user.json
{
  "select": "user",
  "from": "users",
  "controller": "object",
  "columns": ["id", "username", "email", "avatar", "fullname", "created_at"],
  "populate": ["isFollowing"]
}
```
