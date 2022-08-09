---
title: Database
---

# Database

Database settings for connecting to your database.

You should configure your PostgreSQL database before using `mavi start` command.

## Create database config

Create a `database` folder into your project root and add new file as `development.js`, `production.js`, `test.js`, etc.

> You can also use `.json` files.

Example database file:

```js
// production.js
{
  client: "pg",
  connection: {
    database: "test",
    user: "postgres",
    password: "admin"
  },
  pool: { // optional
    min: 2,
    max: 10,
  },
  debug: false, // prints knex queries to console
}
```
