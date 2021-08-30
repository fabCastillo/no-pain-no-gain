const express = require('express');

const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require ('../network/errors');

const app = express();

// Recibir body en peticiones

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTER
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);

app.use(errors);

module.exports = app;