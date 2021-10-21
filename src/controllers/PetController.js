const PetController={}

const Pet=require('../models/Pet')

PetController.create= async (req, res)=>{

    const user=req.decoded.sub

    var { imagen,ciudad,raza,color,edad,nombre,size,tipo} =req.body //atributos

    if(imagen != undefined && ciudad != undefined && raza != undefined && color != undefined &&
    edad != undefined && nombre != undefined && size != undefined && tipo != undefined) {

        const registro = new Pet({
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

        await registro.save()

        res.status(200).json({
            mensaje: "Mascota guardada"
        })
    }else{
        res.status(203).json({
            mensaje: "Por favor llene todos los campos"
        })
    }

}

PetController.getAllPets = (req, res) =>{

    Pet.find({},function(err,pets){
        if (err) {
            // Devolvemos el código HTTP 203, de mascota no encontrada.
            res.status(203).json({ status: "error", data: "No se han encontrado mascotas"});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: pets });
        }
    }).populate('user')

}

PetController.getPetsBySearch = (req, res)=>{

    const s=req.headers['condicion']

    Pet.find({$or:[
            {"nombre":{$regex :  new RegExp("^"+s+".*",'i' )}},
            {"raza":{$regex :  new RegExp("^"+s+".*",'i') }},
            {"tipo":{$regex :  new RegExp("^"+s+".*",'i') }}
            ]},function(err,pets){
        if (err || pets.length ==0) {
            // Devolvemos el código HTTP 203
            res.status(203).json({ status: "error", data: "No se han encontrado mascotas con el criterio de busqueda"});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: pets });
        }
    }).populate('user')
}

PetController.reportPetLost = async(req,res)=>{

    const user=req.decoded.sub

    var { imagen,ciudad,raza,color,edad,nombre,size,tipo} =req.body //atributos

    console.log(req.body)


    if(raza==undefined){
        raza="Raza Desconocida"
    }

    if(color==undefined){
        color="Color Desconocido"
    }

    if(nombre==undefined){
        nombre="Mascota Perdida"
    }

    if(size==undefined){
        size="Tamaño Desnococido"
    }

    if(tipo==undefined){
        tipo="Tipo Desconocido"
    }

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
        mensaje:"Mascota perdida Almacenada"
    })
}

PetController.getPetsByFilter = (req,res)=>{

}

PetController.getPet = (req, res) =>{
    const id=req.headers['id'];

    Pet.findById(id,function(err,pet){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado la mascota"});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: pet });
        }
    }).populate('user')

}

PetController.edit=(req, res)=>{


    const user=req.decoded.sub
    const pet = req.headers['pet']

    Pet.findByIdAndUpdate(pet, { $set: req.body }, function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado la mascota"});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Datos actualizados" });
        }
    });
}

PetController.delete=(req, res)=>{

    const user=req.decoded.sub
    const pet = req.headers['pet']

    Pet.findByIdAndRemove(pet, function(err, data) {
        if (err || !data) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado la mascota"});
        } else {
            res.status(200).json({ status: "ok", data: "Se ha eliminado correctamente la mascota"});

        }
    });

}

PetController.getMyPets = (req, res) =>{

    const user=req.decoded.sub

    Pet.find({'user':user},function(err,pets){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado"});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: pets });
        }
    })

}





//Se exporta controlador
module.exports=PetController
