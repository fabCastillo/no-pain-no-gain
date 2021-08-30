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
    validationHandler('read_users'),
    collection
);

router.get('/:document', 
    passport.authenticate('jwt', { session: false }), 
    validationHandler('read_user'), 
    getUser
);

router.post('/', 
    passport.authenticate('jwt', { session: false }), 
    validationHandler('create_users'),
    register
);
router.put('/', 
    passport.authenticate('jwt', { session: false }), 
    validationHandler('update_users'),    
    update
);
router.delete('/:document', 
    passport.authenticate('jwt', { session: false }), 
    validationHandler('delete_users'),
    remove
);

function collection (req, res, next) {
    controller.list()
        .then( (lista) => response.success(req, res, lista, 200) )
        .catch ( next );
}

function getUser(req, res, next) {
    controller.get(req.params.document)
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
    controller.remove(req.params.document)
        .then( (resp) => response.success(req, res, resp, 200) )
        .catch( next );
}

module.exports = router;