'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Carrega todas as rotas
const index_route = require('./routes/index-route');
const user_route = require('./routes/user-route');
const address_route = require('./routes/address-route');
const event_route = require('./routes/event-routes');
const token_route = require('./routes/token-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index_route);
app.use('/user', user_route);
app.use('/user/address', address_route);
app.use('/event', event_route);
app.use('/token', token_route);

module.exports = app;
