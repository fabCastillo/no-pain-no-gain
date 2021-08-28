const express = require('express');

const config = require('../config/index');
const user = require('./components/user/network');
const auth = require('./components/auth/network');

const app = express();

// Recibir body en peticiones
app.use(express.json());

// ROUTER
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);

app.listen(config.api.port, () => {

    console.log(`Escuchando en el puerto ${config.api.port}`);

});