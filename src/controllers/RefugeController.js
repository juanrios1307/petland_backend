const RefugeController={}

const Refuge=require('../models/Refuge')
const Pet = require("../models/Pet");


RefugeController.create= async (req, res)=>{

    const user = req.decoded.sub

    var {ciudad,nombre,long,lat} = req.body //atributos

    const registro = new Refuge({
        user,ciudad,nombre,long,lat
    })

    await registro.save()

    res,json({
        mensaje: 'Refugio Guardado'
    })

}

RefugeController.edit=(req, res)=>{


}

RefugeController.delete=(req, res)=>{

}

RefugeController.getMineRefuges = (req, res) =>{


}

RefugeController.getAllRefuges = (req, res) =>{

    Refuge.find({},function(err,refuges){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: refuges });
        }
    }).populate('user')

}

RefugeController.rating = (req,res)=>{

    const id=req.headers['id'];
    const user=req.decoded.sub

    var {comment,rating}= req.body

    const ratings={
        comment,
        rating,
        user,
    }

    Refuge.update({id},
        {$push:{
            ratings
            }},
        function (err){
            if(err){
                // Devolvemos el código HTTP 404, de producto no encontrado por su id.
                res.status(203).json({ status: "error", data: "No se ha encontrado"});
            } else {
                // También podemos devolver así la información:
                res.status(200).json({ status: "ok", data: "Rating OK"})
            }
        })

}

RefugeController.getRatings = (req,res)=>{



}

RefugeController.getRefugesByFilter = (req,res)=>{

    const s=req.headers['condicion']

    Refuge.find({$or:[
            {"nombre":{$regex : "^"+s+".*" }},
            {"ciudad":{$regex : "^"+s+".*" }}
        ]},function(err,pets){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado"});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: pets });
        }
    }).populate('user')

}

RefugeController.getRefuge = (req, res) =>{
    const id=req.headers['id'];

    Refuge.findById(id,function(err,refuge){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: refuge });
        }
    })

}

module.exports=RefugeController
