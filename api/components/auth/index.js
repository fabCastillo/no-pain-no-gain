const controller = require('./controller');
const store = require('../../../store/models');

// INYECTAMOS EL DATABASE
module.exports = controller( store );