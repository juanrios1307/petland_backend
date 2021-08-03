const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/PetController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});


route.post('/',protectedRoutes.verifyToken,controller.create)
route.get('/',controller.getAllPets)
route.get('/search/',controller.getPetsBySearch)

route.post('/report',protectedRoutes.verifyToken,controller.reportPetLost)
route.get('/filter/',protectedRoutes.verifyToken,controller.getPetsByFilter)
route.get('/detail/',protectedRoutes.verifyToken,controller.getPet)
route.put('/',protectedRoutes.verifyToken,controller.edit)
route.delete('/',protectedRoutes.verifyToken,controller.delete)
route.get('/mine/',protectedRoutes.verifyToken,controller.getMyPets)




module.exports =route
