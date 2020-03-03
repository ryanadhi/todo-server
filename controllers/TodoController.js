const { Todo } = require ('../models/index') ;
const axios = require ('axios').default

class TodoController {
    static findAll (req, res, next) {
        
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

                const giphy = axios.create ({
                    baseURL: 'http://api.giphy.com/v1/gifs/'
                })

                const query = todo.title.replace(/ /g, "+") ;
                const key = process.env.GIPHY_KEY ;
                
                return giphy.get(`\search?q=${query}&api_key=${key}&limit=2`)
            })

            .then ( gif => {
                res.status(201).json({
                    imageURL : gif.data,
                    message : 'success'
                })
            })
            .catch ( err => {
                next (err)
            })
    }

    static findByPk ( req, res, next) {
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

    static destroy (req,res, next) {
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
                next()
            })
    }
}

module.exports = TodoController