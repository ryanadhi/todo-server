const jwt = require ('jsonwebtoken') ;

function getToken ( payload) {
    return jwt.sign(payload, process.env.JWTKEY)
}

function verifyToken ( token ) {
    return jwt.verify(token, process.env.JWTKEY)
}



module.exports = {
    getToken,
    verifyToken,
}