const databaseDummy = {
    'user': [
        { id: 1, name: 'Fabián'},
        { id: 2, name: 'Andrés'},
    ]
};

function list(table) {
    return databaseDummy[table];
};

function get(table, id) {
    let collection = list(table);
    return collection.find( (item) => item.id === id ) || null; 
};

function upsert(table, data) {
    
    if (!databaseDummy[table]) {
        databaseDummy[table] = [];
    }

    databaseDummy[table].push(data);

    console.log(databaseDummy);

};

function remove(table, id) {
    let collection = list(table);
    let user = get(table, id);
    collection.splice(user.id - 1, 1);
    return collection || 'Sin registros';
};

async function query(table, request) {
    let collection = list(table);
    let keys = Object.keys(request);
    let key = keys[0]
    return collection.filter( (item) => item[key] === request[key] )[0] || null; 
}

module.exports = {

    list,
    get,
    upsert,
    remove,
    query
    
}