const express = require('express');
const routes = require('./src/routes/index');
var jwt = require('express-jwt');
const pathToRegexp = require('path-to-regexp');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.use(
   jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({
     path: ['/user/create', '/login'],
   })
 );
 
//app.use(authentication);
app.use(routes);

app.listen(port, () => console.log('Deu bom!'));
