const { User } = require ('../models/index') ;
const { verifyPassword } = require ('../helpers/bcrypt') ;
const { getToken } = require ('../helpers/jwt')

class UserController {
    
    static create (req,res, next) {
        const { email, password } = req.body ;

        User.create ( {
            email : email,
            password : password
        })
            .then ( newUser => {
                const response = {
                    id : newUser.id,
                    email : newUser.email
                }
                res.status (201).json({
                    user : response
                })
            })
            .catch ( err => {
                next(err)
            } )
    }

    static login (req,res, next){
        const { email, password } = req.body ;

        User.findOne ( {
            where : {
                email : email
            }
        })
            .then ( foundUser => {
                if (foundUser){
                    
                    const checkPW = verifyPassword(password, foundUser.password) ;

                    if (checkPW) {

                        const payload = {
                            id : foundUser.id,
                            email : foundUser.email
                        }

                        const token = getToken (payload)
    
                        res.status(200).json({
                            token : token
                        })

                    } else {
                        // wrong password
                        next ( {
                            status : 400,
                            message : 'Wrong Email / Password'
                        })
                    }


                } else {
                    // email not found
                    next ( {
                        status : 400,
                        message : 'Wrong Email / Password'
                    })
                }
            })
            .catch ( err => {
                next()
            })


    }
}

module.exports = UserController