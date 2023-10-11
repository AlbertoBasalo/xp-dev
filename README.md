# xp-dev

Demo API server made with Express.js, Sequelize, and PostgreSQL.

```bash
mkdir xp-dev
cd xp-dev
npm init -y
npm i express
npm i -D nodemon
```

`.sequelizerc`

```js
const path = require("path");

module.exports = {
  config: path.resolve("src", "db", "config", "config.json"),
  "models-path": path.resolve("src", "db", "models"),
  "seeders-path": path.resolve("src", "db", "seeders"),
  "migrations-path": path.resolve("src", "db", "migrations"),
};
```

https://customer.elephantsql.com/instance

Copy the URL from the Details tab and paste it into:

- db/config/config.json file.

```bash
npm i pg pg-hstore sequelize
npm i -D sequelize-cli
npx sequelize-cli init
```

After running the above command, create the following models:

```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
npx sequelize-cli model:generate --name Activity --attributes name:string,description:string,price:float,quorum:integer,capacity:integer
npx sequelize-cli model:generate --name Booking --attributes activityId:integer,userId:integer,participants:integer,status:string,capacity:integer
npx sequelize-cli db:migrate
```
