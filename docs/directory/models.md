---
title: Models
---

# Models

Models are used to build relational database and used by `controllers`.

## Create models config

First create a `models` folder into your project root and add new files as `[model_name].js` or `[model_name].json`.

Example model file:

```js
// customers.js
module.exports = {
  id: {
    type: 'integer',
    constraints: ['primary'],
  },
  name: {
    type: 'string',
    maxLength: 100,
  },
  email: {
    type: 'string',
    maxLength: 100,
  },
  gender: {
    type: 'enum',
    dataset: ['male', 'female'],
  },
  status: {
    type: 'integer',
    references: 'statuses.id',
    defaultTo: 1,
    constraints: ['notNullable'],
    comment: 'customer status',
  },
  updated_at: {
    type: 'timestamp',
    useTz: true,
    precision: 6,
  },
  created_at: {
    type: 'timestamp',
    useTz: true,
    precision: 6,
  },
}
```

When you use `mavi build`, it will create `[model_name]` table with all defined columns and its options. Also if there is no `hash` assigned, it will assign automatically.

When you make any changes in your model file, you should use `mavi build` again. It will detect the changes and update the database.

## Model Properties

1. **type**: Data type. available: `increments`, `integer`, `bigInteger`, `text`, `string`, `float`, `double`, `decimal`, `boolean`, `date`, `datetime`, `time`, `timestamp`, `binary`, `enum`, `json`, `jsonb`, `uuid`, `geometry`, `geography`, `point`
1. **constraints**: `primary` , `nullable` , `notNullable` , `unique` , `index`
1. **maxlength**: Max length of the string
1. **dataset**: Used for `enum` type
1. **precision**: Used with `datetime`, `time`, `timestamp` types
1. **useTz**: Used with `datetime`, `timestamp` types. By default PostgreSQL creates column with timezone (timestamptz type) and MSSQL does not (datetime2). This behaviour can be overriden by passing the useTz option (which is by default false for MSSQL and true for PostgreSQL). MySQL does not have useTz option.
1. **charset**: Sets the charset for the database table, only available within a createTable call, and only applicable to MySQL.
1. **defaultTo**: Default column value
1. **comment**: Sets comment for the table column.
1. **onDelete**: `RESTRICT`, `CASADE`, `SET NULL`, `NO ACTION`
1. **onUpdate**: `RESTRICT`, `CASADE`, `SET NULL`, `NO ACTION`
1. **references**: References to another `model` where the foreign key column is located
1. **unsigned**: Specifies an integer as unsigned. No-op if this is chained off of a non-integer field.
1. **private**: Private columns are not included in the response.
1. **hash**: Unique hashes to detect database state changes. If it assigned automatically do not change their values for sustain database state accuracy.

## Seeds

Seeds are used to create default values for your database.

To create seed for one table, you need to create a `[model_name].seed.js` or `[model_name].seed.json` file inside `models` folder.

Example seed file:

```js
// customers.seed.js
module.exports = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
    gender: 'male',
    status: 1,
  },
  {
    id: 2,
    name: 'Julia Doe',
    email: 'julia@doe.com',
    gender: 'female',
    status: 2,
  },
  {
    id: 3,
    name: 'Albert Sun',
    email: 'albert@sun.com',
    gender: 'male',
    status: 3,
  },
  {
    id: 4,
    name: 'Yasemin Doe',
    email: 'yasemin@doe.com',
    gender: 'female',
    status: 1,
  },
]
```

---

You should run `mavi build` to apply model changes each time.

You can also integrate it with `nodemon` if you wan't instant updates.
