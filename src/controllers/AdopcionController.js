const Adopcion={}

const Pet=require('../models/Pet')
const User=require('../models/User')

Adopcion.reportAdoptablePet = async(req,res)=>{

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
        tipo,
        adopcion:true
    })

    await  registro.save()

    res.json({
        mensaje:"Mascota Guardada"
    })
}

Adopcion.adoptarPet = async(req,res)=>{

    const user=req.decoded.sub
    const pet = req.headers['pet']

    console.log(pet)

    User.findByIdAndUpdate(user, {$push:{Adopciones:pet}}, function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Mascota Adoptada Satisfactoriamente" });
        }
    });

}


Adopcion.getAdoptPets = async(req,res)=>{
    const id = req.decoded.sub

    User.findById(id,{Adopciones:1} , function (err,adopciones) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el viaje con id: "});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: adopciones });
        }
    }).populate('Adopciones');

}

Adopcion.getAvailablePets = async(req,res)=>{

    Pet.find({adopcion:true}, function (err,pets) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "error"});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: pets });
        }
    }).populate('user');

}

//Se exporta controlador
module.exports=Adopcion
