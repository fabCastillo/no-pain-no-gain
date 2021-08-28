const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const TABLE = 'auth';

module.exports = ( store = require('../../../store/dummy')) => {

    async function login({ username, password }) {
        
        const user =  await store.query(TABLE, { username, password });

        bcrypt.compare(password, user.password)
            .then( (sonIguales) => {
                
                if (!sonIguales){

                    throw new Error( 'Información Invalida', 401 );
                
                }
                
                return auth.sign(user);

            });
        
    };
    
    async function upsert(data){
        
        const authData = {
            id: data.id
        };

        if(data.username) {
            authData.username = data.username;
        };

        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 10);
        };

        return store.upsert(TABLE, authData);

    };

    return {

        login,
        upsert
        
    };
};