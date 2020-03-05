const router = require ('express').Router();
const TodoController = require ('../controllers/TodoController') ;
const authentication = require ('../middlewares/authentication') ;
const authorization = require ('../middlewares/authorization') ;

router.use (authentication) ;

router.post ('/', TodoController.create) ;
router.get ('/', TodoController.findAll) ;
router.get ('/:id', authorization, TodoController.findByPk) ;
router.put ('/:id', authorization, TodoController.update) ;
router.patch ('/:id', authorization, TodoController.makeItDone) ;
router.delete ('/:id', authorization, TodoController.destroy) ;

module.exports = router