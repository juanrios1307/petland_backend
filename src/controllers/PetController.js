const PetController={}

const Pet=require('../models/Pet')


PetController.create= async (req, res)=>{

    const user=req.decoded.sub

    var { imagen,ciudad,raza,color,edad,nombre,size,tipo} =req.body //atributos

    const registro=new Pet({
        imagen,
        user,
        ciudad,
        raza,
        color,
        edad,
        nombre,
        size,
        tipo
    })

    await  registro.save()

    res.json({
        mensaje:"Mascota guardado, puede iniciar sesión"
    })

}

PetController.getAllPets = (req, res) =>{

    Pet.find({},function(err,pets){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: pets });
        }
    }).populate('user')

}

PetController.getPetsByRace = (req,res)=>{

    const s=req.headers['condicion']

    Pet.find({$or:[
            {"nombre":{$regex : "^"+s+".*" }},
            {"raza":{$regex : "^"+s+".*" }},
            {"tipo":{$regex : "^"+s+".*" }}
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

PetController.reportPetLost = (req,res)=>{

}

PetController.getPetsByFilter = (req, res) =>{

}

PetController.getPet = (req, res) =>{
    const id=req.headers['id'];

    Pet.findById(id,function(err,pet){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: pet });
        }
    })

}

PetController.edit=(req, res)=>{


}

PetController.delete=(req, res)=>{


}

PetController.getMyPets = (req, res) =>{


}





//Se exporta controlador
module.exports=PetController
