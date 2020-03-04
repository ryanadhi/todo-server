const bcrypt = require ('bcryptjs') ;
const salt = bcrypt.genSaltSync(8) ;

function hashPassword (password) {
    return bcrypt.hashSync(password, salt)
}

function verifyPassword (passwordInput , passwordDB) {
    return bcrypt.compareSync ( passwordInput , passwordDB)
}

module.exports = {
    hashPassword,
    verifyPassword,
}