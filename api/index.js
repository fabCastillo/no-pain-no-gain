const express = require('express');

const user = require('./components/user/network');
const auth = require('./components/auth/network');
const city = require('./components/city/network');
// const sede = require('./components/sede/network');
const errors = require ('../network/errors');

const app = express();

// Recibir body en peticiones

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTER
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);
app.use('/api/v1/city', city);
// app.use('/api/v1/sede', sede);

app.use(errors);

module.exports = app;