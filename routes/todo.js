const router = require ('express').Router();
const TodoController = require ('../controllers/TodoController') ;

router.post ('/', TodoController.create) ;
router.get ('/', TodoController.findAll) ;
router.get ('/:id', TodoController.findByPk) ;
router.put ('/:id', TodoController.update) ;
router.delete ('/:id', TodoController.destroy) ;

module.exports = router