const  {Router} =require('express')
const route=Router()
const  controlUser=require('../controllers/UserController')
const protectedRoutes=require('../BO/ProtectedRoutes')
const verifyEmail = require('../BO/VerifyEmail')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});


route.post('/',verifyEmail.getEmail,controlUser.create)
route.post('/login/',controlUser.login)
route.put('/',protectedRoutes.verifyToken,controlUser.edit)
route.delete('/',protectedRoutes.verifyToken,controlUser.delete)
route.get('/mine/',protectedRoutes.verifyToken,controlUser.getMyProfile)
route.get('/',protectedRoutes.verifyToken,controlUser.getOtherProfile)


module.exports =route
