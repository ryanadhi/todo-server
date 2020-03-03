const { Todo } = require ('../models/index') ;

module.exports = (req,res,next) => {
    try {

        Todo.findOne ( {
            where : {
                id : req.params.id
            }
        })
            .then ( foundTodo => {
                if (foundTodo.UserId == req.decoded.id){
                    next()
                } else {
                    res.status (500).json('not authorized')
                }
            })

            .catch ( err => {
                res.status(500).json('error dari authorization1')
            })


    } catch (err) {
        res.status(500).json('error dari authorization2')
    }
}