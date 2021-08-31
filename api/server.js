const app = require('./index');
const config = require('../config');

const server = app.listen(config.api.port, () => {
    console.log(`Escuchando en el puerto ${config.api.port}`);
});

module.exports = server;