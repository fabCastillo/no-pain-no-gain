const auth = require('../auth');

const TABLE = 'user';

module.exports = ( store = require('../../../store/dummy')) => {
  
    async function list(){
        return store.list(TABLE);
    };

    async function get(id){
        return store.get(TABLE, parseInt(id));
    };

    async function save(body) {

        let collection = store.list(TABLE);
        let id = collection[ collection.length - 1 ].id + 1;
        
        let user = {
            id,
            name: body.name,
            username: body.username
        };
        
        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            });
        };

        return store.upsert(TABLE, user);
    };

    async function remove(id){
        return store.remove(TABLE, parseInt(id) );
    }

    return {
        list,
        get,
        save,
        remove
    };
};