const controller = require('./controller');
const store = require('../../../store/dummy');

// INYECTAMOS EL DATABASE
module.exports = controller( store );