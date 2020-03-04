module.exports = function (err, req, res, next) {

    if (err.name == 'SequelizeValidationError') {
        const message = err.errors.map ((el)=>{
            return el.message
        })
        res.status(400).json({
            message : message
        })
    } else {
        const statusCode = err.status || 500 ;
        const message = err.message || 'Internal Server Error'
        res.status(statusCode).json({
            message : message
        })
    }
}