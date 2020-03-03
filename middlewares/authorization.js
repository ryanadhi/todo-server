const { Todo } = require ('../models/index') ;

module.exports = (req,res,next) => {
    Todo.findOne ( {
        where : {
            id : req.params.id
        }
    })
        .then ( foundTodo => {
            console.log(req.decoded);
            if (foundTodo.UserId == req.decoded.id){
                next()
            } else {
                next ( {
                    status : 401,
                    message : 'You are not authorized'
                })
            }
        })

        .catch ( err => {
            next ()
        })
}