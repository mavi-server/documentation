---
title: Queries
---

## Queries

You can request to your api with queries. Also you can manage which query should be allowed or what is the default value will be.

There are five built-in queries and they're available for all defined routes.

### Sort

Sort the results in either ascending or descending order. Default is `id-asc`.

Example requests:

1. simple sort: `/customers?sort=id-desc`
1. multiple sort: `/customers?sort=id-asc:name:desc`
1. multiple sort: `/customers?sort=id-asc,name:desc`

### Start

Starts the results from `n.` index. Default is `0`.

Example request:

1. start results from 3th: `/customers?start=2`

### Limit

Limit the results. Default is `10`.

Example request:

1. limit results by 5 `/customers?limit=5`

### Exclude

Excludes specified columns from the result.

Example request:

1. exclude id and status: `/customers?exclude=id:status`
1. exclude id and status: `/customers?exclude=id,status`

### Where

You can make advanced where queries.

Example requests:

1. john doe's: `/customers?where=name-eq-John Doe`
1. not john doe's: `/customers?where=name-neq-John Doe`
1. capitalized 'John': `/customers?where=name-ins-John` // in(s) case sensitive
1. costumers' name starts with 'j': `/customers?where=name-j%` // SQL - LIKE wildcards
1. name not includes 'sun': `/customers?where=name-nin-sun`
1. costumers' status is larger than 1: `/customers?where=status-lg-1`
1. costumers' status is larger than 1 or equal: `/customers?where=status-lge-1`
1. costumers' status is smaller than 2: `/customers?where=status-sm-2`
1. costumers' status is smaller than 2 or equal: `/customers?where=status-sme-2`
1. status is larger than 1 and names are 'John': `/customers?where=name-john and status-lg-1` // delimeter can be "-and-" too.
1. name contains 'john' or 'julia': `/customers?where=name-john or name-julia`
1. name contains 'john' or 'julia' and the status is 1: `/customers?where=name-john or name-julia and status-1`

## Query Configurations

Control and customize query behaviours.

Let's assume we have a route collection called `customers`. It has following configurations:

```js
// customers.js
module.exports = [
  {
    path: '/',
    method: 'get',
    controller: 'find',
    populate: ['status'],
  },
  // .
  // .
  // .
}
```

To control or customize the queries, we should define a `query` property inside of the route.

```js
// customers.js
module.exports = [
  {
    path: '/',
    method: 'get',
    controller: 'find',
    populate: ['status'],
    query: MaviQuery
  },
}
```

`MaviQuery` type can have the following values:

#### $, lock, locked

This value means incoming queries will not be evaluated

```js
// customers.js
module.exports = [
  {
    path: '/',
    method: 'get',
    controller: 'find',
    populate: ['status'],
    query: "$" // queries will not be evaluated
  },
}
```

#### MaviQuery Object

```js
// customers.js
module.exports = [
  {
    path: '/',
    method: 'get',
    controller: 'find',
    populate: ['status'],
    query: {
      start: 5, // not protected, open to overwritten by incoming requests
      limit: [10], // protected and wont't change
      where: "$name-julia", // `name`'s value can't be overwritten but client request can extent this default query.
      sort: "locked", // `sort` queries will be ignored
      exclude: "$", // `exclude` queries will be ignored
    }
  },
}
```

Another variant:

```js
// customers.js
module.exports = [
  {
    path: '/',
    method: 'get',
    controller: 'find',
    populate: ['status'],
    query: {
      where: ["name-john-and-status-eq-1"], // where is protected. there is no need to protect individual columns with $ prefix.
      sort: ["id-desc,name-asc"], // sort is protected and default value will be used
      exclude: ["id"],
    }
  },
}
```
