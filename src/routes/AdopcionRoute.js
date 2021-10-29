const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/AdopcionController')
const protectedRoutes=require('../BO/ProtectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});


route.put('/',protectedRoutes.verifyToken,controller.adoptarPet)
route.get('/',protectedRoutes.verifyToken,controller.getAdoptPets)
route.post('/',protectedRoutes.verifyToken,controller.reportAdoptablePet)

module.exports =route
