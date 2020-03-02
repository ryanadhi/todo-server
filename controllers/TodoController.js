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
                    error : err
                })
            })
    }

    static create ( req, res) {

        let newTodo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : new Date (req.body.due_date)
        }

        Todo.create (newTodo)
            .then ( todo => {
                res.status(201).json({
                    data : todo,
                    message : 'success'
                })
            })

            .catch ( err => {
                res.status (500).json({
                    error : err
                })
            })
    }

    static findByPk ( req, res) {
        let idToFind = Number(req.params.id) ;

        Todo.findByPk (idToFind)
            .then (todo => {
                res.status (200).json({
                    data: todo
                })
            })

            .catch ( err => {
                res.status (500).json({
                    error : err
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
            }
        })
            .then (() => {
                return Todo.findByPk (idToUpdate)
            })

            .then ( updatedTodo => {
                res.status (200).json({
                    data : updatedTodo,
                    message : 'updated'
                })
            })

            .catch ( err => {
                res.status (500).json({
                    error : err
                })
            })
    }

    static destroy (req,res) {
        let idToDelete = Number(req.params.id) ;

        Todo.findByPk (idToDelete)
            .then ( foundTodo => {

                let deletedTodo = foundTodo ;

                Todo.destroy({
                    where : {
                        id : idToDelete
                    }
                })

                return deletedTodo
            })

            .then ( deletedTodo => {
                res.status (200).json({
                    data : deletedTodo,
                    message : 'deleted'
                })
            })

            .catch ( err => {
                res.status (500).json({
                    error : err
                })
            })
    }
}

module.exports = TodoController