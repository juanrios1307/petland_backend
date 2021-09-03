const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/RefugeController')
const protectedRoutes=require('../BO/ProtectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});


route.post('/',protectedRoutes.verifyToken,controller.create)
route.put('/',protectedRoutes.verifyToken,controller.edit)
route.delete('/',protectedRoutes.verifyToken,controller.delete)
route.get('/mine/',protectedRoutes.verifyToken,controller.getMineRefuges)
route.get('/',protectedRoutes.verifyToken,controller.getAllRefuges)
route.put('/rating/',protectedRoutes.verifyToken,controller.rating);
route.get('/rating/',protectedRoutes.verifyToken,controller.getRatings);
route.get('/filter/',protectedRoutes.verifyToken,controller.getRefugesByFilter);
route.get('/search/',protectedRoutes.verifyToken,controller.getRefuge)
module.exports =route
