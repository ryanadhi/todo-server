const { Todo } = require ('../models/index') ;
const axios = require ('axios').default ;
const giphy = axios.create ({
    baseURL: 'http://api.giphy.com/v1/gifs/'
})

const pexels = axios.create ({
    baseURL: 'https://api.pexels.com/v1/',
    headers : {
        "Authorization" : process.env.PEXEL_KEY
    }
})

class TodoController {
    static findAll (req, res, next) {        
        const status = req.headers.iscomplete ;
        
        Todo.findAll ({
            where : {
                status : status,
                UserId : req.decoded.id
            },
            attributes : {
                exclude : ['createdAt', 'updatedAt']
            },
            order : ['due_date']
        }) 
            .then (todos => {
                res.status (200).json({
                    data : todos
                })
            })

            .catch ( err => {
                
                next(err)
            })
    }

    static create ( req, res, next) {

        let newTodo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            UserId : req.decoded.id,
        }

        const query = newTodo.title.replace(/ /g, "+") ;

        pexels.get (`/search?query=${query}&per_page=2&page=1`)
            .then ( (response) => {
                if (response.data.photos.length === 0) {
                    newTodo.urlImage = 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'
                } else {
                    newTodo.urlImage = response.data.photos[0].src.tiny ;

                }
                return Todo.create (newTodo)
            })

            .then ( todo => {
                const key = process.env.GIPHY_KEY ;
                
                return giphy.get(`/search?q=${query}&api_key=${key}&limit=2`)
            })

            .then ( gif => {
                
                if (gif.data.data.length === 0){
                    let image = "https://media1.giphy.com/media/26xBzu2ogAunL19hS/100.gif?cid=0a0cdce4242cb796098e996c1d9a374f4c94a4cc3e5ca4d8&rid=100.gif" ;
                    res.status(201).json({
                        imageURL : image ,
                        message : 'success'
                    })
                } else {
                    res.status(201).json({
                        imageURL : gif.data.data[0].images.fixed_height_small.url ,
                        message : 'success'
                    })
                }

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
                next(err)
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

        const query = updateTodo.title.replace(/ /g, "+") ;

        pexels.get (`/search?query=${query}&per_page=2&page=1`)
        .then ( (response) => {
            if (response.data.photos.length === 0) {
                updateTodo.urlImage = 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'
            } else {
                updateTodo.urlImage = response.data.photos[0].src.tiny ;

            }
            return Todo.update (updateTodo, {
                where : {
                    id : idToUpdate
                },
                returning: true
            })
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

    static makeItDone (req,res,next){

        let idToFind = req.params.id ;
        Todo.findByPk (idToFind)
            .then (todo => {
                if (todo){
                    let updateTodo = {
                        title : todo.dataValues.title,
                        description : todo.dataValues.description,
                        status : true,
                        due_date : todo.dataValues.due_date,
                        UserId : todo.dataValues.UserId
                    }
            
                    return Todo.update (updateTodo, {
                        where : {
                            id : idToFind
                        }
                    })

                } else {
                    // not found
                    next ( {
                        status : 404,
                        message : 'Not Found'
                    })
                }
            })

            .then ( (response) => {
                res.status (200).json({
                    message : 'updated'
                })
            })

            .catch ( err => {
                next(err)
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
                    return Todo.destroy({
                        where : {
                            id : idToDelete
                        }
                    })
                }
            })

            .then ( (response) => {
                res.status (200).json({
                    message : 'deleted'
                })
            })

            .catch ( err => {
                next(err)
            })
    }
}

module.exports = TodoController