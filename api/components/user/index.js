const User = require('./controller');
const store = require('../../../store/models');

// INYECTAMOS EL DATABASE
module.exports = new User( store );