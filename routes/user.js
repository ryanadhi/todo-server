const router = require ('express').Router();
const UserController = require ('../controllers/UserController') ;

router.post ('/register', UserController.create) ;
router.post ('/login', UserController.login) ;
router.post ('/googleSignIn', UserController.googleSignIn) ;

module.exports = router