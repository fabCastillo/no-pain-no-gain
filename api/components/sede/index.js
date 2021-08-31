const Sede = require('./controller');
const store = require('../../../store/models');

// INYECTAMOS EL DATABASE
module.exports = new Sede( store );