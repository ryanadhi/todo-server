const { User } = require ('../models/index') ;
const { verifyPassword } = require ('../helpers/bcrypt') ;
const { getToken } = require ('../helpers/jwt') ;
const {OAuth2Client} = require('google-auth-library');


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

    static googleSignIn (req,res,next){

        const token = req.headers.token ;
        const CLIENT_ID = process.env.GOOGLE_CLIENTID ;
        const client = new OAuth2Client(CLIENT_ID);

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const email = payload['email'];

            User.findOne ( {
                where : {
                    email : email
                }
            })
                .then ( (response)=> {

                    if (response) {

                        const payload = {
                            id : response.id,
                            email : email
                        }

                        const token = getToken (payload)
    
                        res.status(200).json({
                            token : token
                        })

                    } else {

                        return User.create ({
                            email : email,
                            password : process.env.DEFAULT_PASSWORD_GOOGLEUSER
                        })
                    }
                })

                .then ( (createdUser) => {

                    const payload = {
                        id : createdUser.id,
                        email : createdUser.email
                    }

                    const token = getToken (payload)

                    res.status(200).json({
                        token : token
                    })
                })
          }
          verify().catch((err)=>{
              next(err)
          });
    }
}

module.exports = UserController