const { verifyToken } = require ('../helpers/jwt') ;
const { User } = require ('../models/index') ;

module.exports = (req,res,next) => {
    try {
        const token = req.headers.token
        req.decoded = verifyToken (token);

        User.findOne ( {
            where : {
                email : req.decoded.email
            }
        })
            .then ( foundUser => {
                if (foundUser) {
                    next()
                } else {
                    // next ( {
                    //     status : 400,
                    //     message : 'Bad request'
                    // })
                    // user not found, please login again
                    res.status (500).json('Please login')
                }
            })
            .catch ( err => {
                res.status (500).json('error dari authentication1')
            })

    } catch(err) {
        res.status (500).json('error dari authentication2')
    }
}