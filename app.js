const express = require('express');
const routes = require('./src/routes/index');
const secretKey = 'testando Key';
var jwt = require('express-jwt');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/',jwt({secret:secretKey,algorithms: ['HS256']}).unless({path:['/user/create','/login']}));
app.use(routes);

app.listen(port, () => console.log('Deu bom!'));
