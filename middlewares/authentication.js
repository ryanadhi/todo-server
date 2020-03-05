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
                    
                    // user not found, please login again
                    next ( {
                        status : 401,
                        message : 'You are not authenticated'
                    })
                }
                return null
            })
            .catch ( err => {
                next(err)
            })

    } catch(err) {
        next ( {
            status : 401,
            message : 'You are not authenticated'
        })
    }
}