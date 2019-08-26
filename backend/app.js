const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

//https://expressjs.com/en/api.html#req.app
app.locals.siteTitle = "Some Title";

//Automatically parse all requests to JSON, otherwise you need to parse on each route.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Api routes

app.use('/api', routes);

module.exports = app;