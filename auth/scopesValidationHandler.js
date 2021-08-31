module.exports = function scopesValidationHandler( actionScope ){
    return function ( req, res, next ) {
        
        if( !req.user || !req.user.scopes ) {
            next({ message:'unauthorized user', statusCode: 401 });
        }

        const scopes = req.user.scopes.find( scope => (scope.slug === actionScope));
        if( !scopes ) {
            next({ message:'unauthorized scope', statusCode: 401 });
        }

        next();
   
    }
}