const { User } = require ('../models/index') ;
const { verifyPassword } = require ('../helpers/bcrypt') ;

class UserController {
    
    static create (req,res) {
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
                    data : response
                })
            })
            .catch ( err => {
                res.status(500).json({err})
            } )
    }

    static login (req,res){
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
    
                        res.status(200).json({
                            payload : payload
                        })

                    } else {
                        // wrong password
                    }


                } else {
                    // email not found
                }
            })
            .catch ( err => {
                res.status(500).json({err})
            })


    }
}

module.exports = UserController