const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');
const passport = require('passport');
const validationHandler = require('../../../auth/scopesValidationHandler');

const router = express.Router();

//Middleware del PassPort
require('../../../auth/jwt');

router.get('/', 
    passport.authenticate('jwt', { session: false }), 
    validationHandler('read_sede'),
    collection
);

router.get('/:city', 
    passport.authenticate('jwt', { session: false }), 
    validationHandler('read_sede'), 
    get
);

router.post('/', 
    passport.authenticate('jwt', { session: false }), 
    validationHandler('create_users'),
    register
);
router.put('/', 
    passport.authenticate('jwt', { session: false }), 
    validationHandler('update_sede'),    
    update
);
router.delete('/:city', 
    passport.authenticate('jwt', { session: false }), 
    validationHandler('delete_sede'),
    remove
);

function collection (req, res, next) {
    controller.list()
        .then( (lista) => response.success(req, res, lista, 200) )
        .catch ( next );
}

function get(req, res, next) {
    controller.get(req.params.city)
        .then( (user) => response.success(req, res, user, 200) )
        .catch( next );
}

function register(req, res, next) {
    controller.register(req.body)
        .then( (resp) => response.success(req, res, resp, 201) )
        .catch( next );
}

function update(req, res, next) {
    controller.update(req.body)
        .then( (resp) => response.success(req, res, resp, 201) )
        .catch( next );
}

function remove(req, res, next) {
    controller.remove(req.params.city)
        .then( (resp) => response.success(req, res, resp, 200) )
        .catch( next );
}

module.exports = router;