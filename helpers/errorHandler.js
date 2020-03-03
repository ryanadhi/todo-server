module.exports = function (err, req, res, next) {
    if (err.code === 400){
        res.status(400).json({
            message: "Bad request"
        })
    } else {
        res.status(500).json({
            message: "Bad request"
        })

    }
}