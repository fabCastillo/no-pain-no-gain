function err(message, code) {
    let e = new Error(message);

    if (code) {
        e.StatusCode = code;
    }

    return e;
}

module.exports = err;