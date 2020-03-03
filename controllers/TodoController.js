const { Todo } = require ('../models/index') ;

class TodoController {
    static findAll (req, res) {
        
        Todo.findAll () 
            .then (todos => {
                res.status (200).json({
                    data : todos
                })
            })

            .catch ( err => {
                res.status (500).json({
                    error : `Internal Server Error`
                })
            })
    }

    static create ( req, res) {

        let newTodo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        Todo.create (newTodo)
            .then ( todo => {
                res.status(201).json({
                    data : todo,
                    message : 'success'
                })
            })

            .catch (next)
            // .catch ( err => {
            //     res.status (500).json({
            //         // error : `Internal Server Error`
            //         err
            //     })
            // })
    }

    static findByPk ( req, res) {
        let idToFind = Number(req.params.id) ;

        Todo.findByPk (idToFind)
            .then (todo => {
                if (todo){
                    res.status (200).json({
                        data: todo
                    })
                } else {
                    res.status (404).json({
                        error : `Not Found`
                    })
                }
            })

            .catch ( err => {
                res.status (500).json({
                    error : `Internal Server Error`
                })
            })
    }

    static update (req, res) {
        let idToUpdate = Number(req.params.id) ;

        let updateTodo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : new Date (req.body.due_date)
        }

        Todo.update (updateTodo, {
            where : {
                id : idToUpdate
            },
            returning: true
        })
            .then ( updatedTodo => {

                if (!updateTodo[1]){
                    res.status (404).json({
                        error : `Not Found`
                    })
                } else {
                    res.status (200).json({
                        data : updatedTodo[1],
                        message : 'updated'
                    })
                }
            })

            .catch ( err => {
                res.status (500).json({
                    error : `Internal Server Error`
                })
            })
    }

    static destroy (req,res) {
        let idToDelete = Number(req.params.id) ;

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