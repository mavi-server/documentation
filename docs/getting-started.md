---
title: Getting started
---

# Installation

Here, you will find information on setting and running a Mavi project.

## Setup Database

To get started you need to have a database. Right now only `PostgreSQL` is supported. There is simple [PostgreSQL configuration guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04) you can refer to.

> You can start using Mavi after setup your database.

## Install the package [mavi](https://www.npmjs.com/package/mavi)

`npm install -g mavi`

## Mavi Configurations

To start mavi server, you must to define your configurations first.

Create a `mavi.config.js` file in your project root like below.

<details>
<summary>
<a name="server-configuration-example">mavi.config.js</a>
</summary>

```js
// mavi.config.js

const { version } = require('package.json')
module.exports = {
  poweredBy: 'mavi v'.concat(version),
  host: 'localhost',
  port: 3001,
  cors: {
    // Check the cors module for more options: https://www.npmjs.com/package/cors
    origin: [
      process.env.CLIENT_URL || 'http://localhost:3000',
      process.env.SERVER_URL || 'http://localhost:3001',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: [
      'x-access-token',
      'x-refresh-token',
      'token',
      'content-type',
      'accept',
    ],
  },
  database: {
    development: {
      client: 'pg',
      connection: {
        database: process.env.DEV_DB_NAME,
        user: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASS,
      },
      pool: {
        min: 2,
        max: 10,
      },
      debug: false, // prints knex queries to console
    },
    production: {
      client: 'pg',
      connection: {
        database: process.env.PRO_DB_NAME,
        user: process.env.PRO_DB_USER,
        password: process.env.PRO_DB_PASS,
      },
      pool: {
        min: 2,
        max: 10,
      },
    },
  },
  api: {
    base: '/api',
    routes: {
      posts: [
        {
          path: '/posts',
          method: 'get',
          controller: 'find',
          exclude: ['content'],
          populate: [
            'bookmark',
            'user',
            'community',
            'thumbnail',
            'responseCount',
          ],
          middlewares: ['greetings'],
        },
        {
          path: '/posts/count',
          method: 'get',
          controller: 'count',
        },
        {
          path: '/posts/:id',
          method: 'get',
          controller: 'findOne',
          populate: [
            'bookmark',
            'user',
            'community',
            'thumbnail',
            'responseCount',
            'tags',
          ],
        },
        {
          path: '/posts/:id',
          method: 'put',
          controller: 'update',
          middlewares: ['is-owner'],
          populate: [
            'bookmark',
            'user',
            'community',
            'thumbnail',
            'responseCount',
            'tags',
          ],
        },
        {
          path: '/posts/:id',
          method: 'delete',
          controller: 'delete',
          middlewares: ['is-owner'],
        },
        {
          path: '/posts',
          method: 'post',
          controller: 'create',
          middlewares: ['authorization'],
          populate: ['bookmark', 'user', 'community', 'thumbnail'],
        },
      ],
      uploads: [
        {
          path: '/uploads',
          method: 'get',
          serve: {
            folder: 'uploads',
            dotfiles: 'ignore',
            etag: false,
            extentsions: ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg'],
            maxAge: '1d',
          },
        },
        {
          path: '/uploads/list',
          method: 'get',
          controller: 'find',
        },
        {
          path: '/uploads/:id',
          method: 'get',
          controller: 'findOne',
          middlewares: ['is-owner'],
        },
        {
          path: '/uploads/:folder',
          method: 'post',
          controller: [
            'upload',
            {
              accept: 'image',
              folders: ['avatars', 'thumnail'],
              maxFileSize: 5242880, // bytes = 5mb
            },
          ],
          middlewares: ['authorization'],
        },
        {
          path: '/uploads/:id',
          method: 'put',
          controller: 'update',
          middlewares: ['is-owner'],
        },
      ],
      // .
      // .
      // .
    },
    define: {
      // Models generates your relational database and used by controllers.
      models: {
        // note: all the `hash` properties are automatically
        // assigned if you put your models in the `models` folder and exported with their name in index file
        // example models/index.js:
        // module.exports = {
        //   users: require('./users'),
        //   posts: require('./posts'),
        // }
        // but if you use them here, you should assign `hash` properties manually
        // hashes are unique strings for each column and model.
        // after that, if you change table/column names, add new tables/columns, or change column properties
        // mavi will update your database automatically on build (unfortunately there is no --watch option for now).
        //
        // ***
        // ** be careful if you drop/rename your hash property, dependent entity
        // ** will be deleted entirely from your database (0.5.4 and previous versions)
        // ***
        users: {
          id: {
            type: 'increments',
            constraints: ['primary'],
            hash: 'WzE2NDMyMTk4NjY1MDRddXNlcnMuaWQ', // assign unique hash property to detect your column changes
          },
          username: {
            type: 'string',
            constraints: ['unique'],
            maxlength: 18,
            hash: 'WzE2NDMyMTk4Nzc0MjRddXNlcnMudXNlcm5hbWU',
          },
          email: {
            type: 'string',
            constraints: ['unique'],
            maxlength: 100,
            hash: 'WzE2NDMyMjA4Nzg4MDdddXNlcnMuZW1haWw',
          },
          age: {
            type: 'integer',
            hash: 'WzENDMjA4Nzg4MDdddXNlcnMuYWdl',
          },
          fullname: {
            type: 'string',
            maxlength: 100,
            hash: 'WzE2NDMyMjE0OTg0NzFdbXl1c2Vycy5mdWxsbmFtZQ',
          },
          password: {
            type: 'string',
            private: true,
            hash: 'WzE2NDMzOTk3MzA4MjJddXNlcnMucGFzc3dvcmQ',
          },
          bio: {
            type: 'string',
            maxlength: 255,
            hash: 'dXNlcnMuYmlv',
          },
          blocked: {
            type: 'boolean',
            default: false,
            hash: 'dXNlcnMuYmxvY2tlZA',
          },
          avatar: { type: 'string', hash: 'dXNlcnMuYXZhdGFy' },
          token: { type: 'text', private: true, hash: 'dXNlcnMudG9rZW4' },
          refresh: { type: 'text', private: true, hash: 'dXNlcnMucmVmcmVzaA' },
          updated_at: {
            type: 'timestamp',
            useTz: true,
            precision: 6,
            hash: 'dXNlcnMudXBkYXRlZF9hdA',
          },
          created_at: {
            type: 'timestamp',
            useTz: true,
            precision: 6,
            hash: 'dXNlcnMuY3JlYXRlZF9hdA',
          },
          hash: 'dXNlcnM',
        },
        posts: {
          id: {
            type: 'increments',
            constraints: ['primary'],
            hash: 'cG9zdHMuaWQ',
          },
          user: {
            type: 'integer',
            constraints: ['notNullable'],
            references: 'users.id', // this is the `id` property of the `users` model
            onDelete: 'cascade', // if you delete a user, all his posts will be deleted
            onUpdate: 'cascade', // if you update a user, all his posts will be updated
            comment: 'author',
            hash: 'cG9zdHMudXNlcg',
          },
          community: {
            type: 'integer',
            references: 'communities.id',
            hash: 'cG9zdHMuY29tbXVuaXR5',
          },
          title: {
            type: 'string',
            maxlength: 100,
            hash: 'cG9zdHMudGl0bGU',
          },
          published: {
            type: 'boolean',
            defaultTo: true,
            hash: 'cG9zdHMucHVibGlzaGVk',
          },
          content: {
            type: 'text',
            constraints: ['notNullable'],
            hash: 'cG9zdHMuY29udGVudA',
          },
          description: {
            type: 'string',
            maxlength: 300,
            hash: 'cG9zdHMuZGVzY3JpcHRpb24',
          },
          thumbnail: {
            type: 'integer',
            references: 'uploads.id',
            hash: 'cG9zdHMudGh1bWJuYWls',
          },
          tags: {
            type: 'string',
            hash: 'cG9zdHMudGFncw',
          },
          language: {
            type: 'string',
            constraints: ['notNullable'],
            hash: 'cG9zdHMubGFuZ3VhZ2U',
          },
          // if type is a timestamp and the column name includes `update`, date will be updated automatically on every update
          updated_at: {
            type: 'timestamp',
            useTz: true,
            precision: 6,
            hash: 'cG9zdHMudXBkYXRlZF9hdA',
          },
          // if type is a timestamp and the column name includes `create`, date will be created automatically on creation
          created_at: {
            type: 'timestamp',
            useTz: true,
            precision: 6,
            hash: 'cG9zdHMuY3JlYXRlZF9hdA',
          },
          hash: 'WzE2NDM1Nzg3NDYwNzBdcG9zdHM',
        },
        uploads: {
          id: {
            type: 'increments',
            constraints: ['primary'],
            hash: 'dXBsb2Fkcy5pZA',
          },
          url: {
            type: 'text',
            constraints: ['notNullable'],
            hash: 'dXBsb2Fkcy51cmw',
          },
          alt: { type: 'text', hash: 'dXBsb2Fkcy5hbHQ' },
          user: {
            type: 'integer',
            comment: 'Image owner',
            references: 'users.id',
            hash: 'dXBsb2Fkcy51c2Vy',
          },
          updated_at: {
            type: 'timestamp',
            useTz: true,
            precision: 6,
            hash: 'dXBsb2Fkcy51cGRhdGVkX2F0',
          },
          created_at: {
            type: 'timestamp',
            useTz: true,
            precision: 6,
            hash: 'dXBsb2Fkcy5jcmVhdGVkX2F0',
          },
          hash: 'dXBsb2Fkcw',
        },
      },
      // Seeds are automatically inserted into your database
      seeds: {
        posts: [
          {
            id: 1,
            user: 1,
            community: 1,
            title: 'Post 1',
            published: true,
            content: '<p>This is the first post</p>',
            description: 'This is the first post',
            thumbnail: 1,
            tags: '[1,2]',
            language: 'en',
            updated_at: '2022-01-01 00:00:00',
            created_at: '2022-01-01 00:00:00',
          },
        ],
      },
      // Populate configs are used in routes
      // There are different types of populate options but they may breaking-change in the future.
      populate: {
        user: {
          select: 'user',
          from: 'users',
          type: 'object',
          columns: [
            'id',
            'username',
            'email',
            'avatar',
            'fullname',
            'created_at',
          ],
        },
        community: {
          select: 'community',
          from: 'communities',
          type: 'object',
          exclude: ['updated_at'],
          populate: ['icon'],
        },
        thumbnail: {
          select: 'thumbnail',
          from: 'uploads',
          type: 'object',
        },
        icon: {
          select: 'icon',
          from: 'uploads',
          type: 'object',
        },
        replyTo: {
          select: 'replyTo',
          from: 'threads',
          type: 'object',
          exclude: ['content', 'timestamps'],
        },
        responseTo: {
          select: 'responseTo',
          from: 'posts',
          type: 'object',
          columns: ['id', 'title', 'community', 'description'],
          populate: ['community'],
        },
        tags: {
          select: 'tags',
          from: 'tags',
          type: 'array-reference',
        },
        responseCount: {
          select: 'responseCount',
          on: 'responseTo',
          from: 'threads',
          type: 'count',
        },
        replyCount: {
          select: 'replyCount',
          on: 'replyTo',
          from: 'threads',
          type: 'count',
        },
        bookmark: {
          select: 'bookmark',
          from: 'bookmarks', // current model name.
          on: 'references', // references = row.id
          query: {
            where: 'type-eq-#context', // #context = parent model name
            // eg: if populate `bookmark` used in posts, parent model name will be posts.
          },
          type: 'token-reference',
          returning: 'id', // '*' or specific column
        },
      },
      // Middlewares are used in routes
      middlewares: {
        greetings: function (req, res, next) {
          console.log('Hello from middleware!')
          next()
        },
      },
    },
  },
}
```

</details>

The object above will be over bloated as your project grows. You can choose [directory structure](#directory-structure) to create more maintainable configurations as well.

### Directory structure

This format lets you define your api configs in each folder.

You can use `.js` or `.json` for config files. If it is a `.js` file, you should export it's content.

```css
?????? database
??? ??? development.js
??? ??? production.js
?????? models
??? ??? users.js
??? ??? posts.js
??? ??? posts.seed.js
??? ??????uploads.js
?????? routes
??? ??? posts.js
??? ??????uploads.js
?????? populate
??? ??? user.js
??? ??? community.js
??? ??? thumbnail.js
??? ??? icon.js
??? ??? replyTo.js
??? ??? responseTo.js
??? ??? tags.js
??? ??? responseCount.js
??? ??? replyCount.js
??? ??????bookmark.js
?????? middlewares
??? ??????greetings.js
?????? utils
```

## Mavi CLI

You can start your server by using mavi cli.

```sh
# Start your server and build the models:
`mavi start -b`
```

### Commands

```sh
`mavi build` # builds the database from your models and seeds

`mavi build --no-seeds` or `mavi build -ns` # builds the db without without the seeds

`mavi seed` # Seeds the database with your `models/{model_name}.seed.js` files

`mavi drop` # Drops the database

`mavi clear` # Truncates the database

# You need to re-run `mavi build` to update the database when you change your models.
```
