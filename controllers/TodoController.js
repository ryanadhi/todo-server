const { Todo } = require ('../models/index') ;

class TodoController {
    static findAll (req, res) {
        
        Todo.findAll ({
            where : {
                id : req.decoded.id
            }
        }) 
            .then (todos => {
                res.status (200).json({
                    data : todos
                })
            })

            .catch ( err => {
                next()
            })
    }

    static create ( req, res, next) {

        let newTodo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            UserId : req.decoded.id
        }

        Todo.create (newTodo)
            .then ( todo => {
                res.status(201).json({
                    data : todo,
                    message : 'success'
                })
            })
            .catch ( err => {
                next (err)
            })
    }

    static findByPk ( req, res) {
        let idToFind = req.params.id ;

        Todo.findByPk (idToFind)
            .then (todo => {
                if (todo){
                    res.status (200).json({
                        data: todo
                    })
                } else {
                    // not found
                    next ( {
                        status : 404,
                        message : 'Not Found'
                    })
                }
            })

            .catch ( err => {
                next()
            })
    }

    static update (req, res, next) {
        let idToUpdate = req.params.id ;

        let updateTodo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : new Date (req.body.due_date),
            UserId : req.decoded.id
        }

        Todo.update (updateTodo, {
            where : {
                id : idToUpdate
            },
            returning: true
        })
            .then ( updatedTodo => {
                if (!updateTodo){
                    next ( {
                        status : 404,
                        message : 'Not Found'
                    })
                } else {
                    res.status (200).json({
                        data : updatedTodo[1],
                        message : 'updated'
                    })
                }
            })

            .catch ( err => {
                next (err)
            })
    }

    static destroy (req,res) {
        let idToDelete = req.params.id ;

        Todo.findByPk (idToDelete)
            .then ( foundTodo => {

                if (!foundTodo){
                    res.status (404).json({
                        error : `Not Found`
                    })
                } else {
                    let deletedTodo = foundTodo ;
                    Todo.destroy({
                        where : {
                            id : idToDelete
                        }
                    })
                    return deletedTodo
                }
            })

            .then ( deletedTodo => {
                res.status (200).json({
                    data : deletedTodo,
                    message : 'deleted'
                })
            })

            .catch ( err => {
                res.status (500).json({
                    error : `Internal Server Error`
                })
            })
    }
}

module.exports = TodoController