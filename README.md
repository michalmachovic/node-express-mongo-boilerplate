# Node.js Express MongoDB Boilerplate

```
npm install nodemon --save-dev
npm install --save express
npm install ejs
npm install --save mongodb
npm install --save mongoose
npm install --save express-session
npm install --save connect-mongodb-session
npm install --save csurf
npm install --save connect-flash
npm install --save bcryptjs
```

This is boilerplate for Node.js Express web with css, routes, controller and ejs templating language connected to MongoDB. For working with Mongo database you can use `MongoDB Compass`. Sessions are stored into db table `sessions`.

You need to insert admin user into `users` table with `bcrypted` password. You can encrypt password here: https://www.devglan.com/online-tools/bcrypt-hash-generator. Following values are for password `password`.
```
{"email":"user@user.com","password":"$2a$04$CAJfJ1RWefn24.hZNltsDe9CNWi38/3.FyCgjU55JqcrGUswcP3OS"}
```
Admin is at http://localhost:3000/admin/login