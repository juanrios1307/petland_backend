const UserController={}
const bcrypt = require('bcryptjs');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

const User=require('../models/User')



UserController.create= async (req, res)=>{

    var {nombre,correo,pwd,telefono,ciudad} =req.body //atributos


    if (pwd) {
        pwd = bcrypt.hashSync(pwd, 10);
    }

    const registro = new User({correo, pwd, nombre, telefono, ciudad,})

    await registro.save()

    res.status(200).json({
        mensaje: "Usuario guardado, puede iniciar sesión"
    })


}

UserController.login= async (req, res)=> {
    const {correo, pwd} =req.body

    const user = await User.findOne({correo});

    if (user && bcrypt.compareSync(pwd, user.pwd)) {
        const token = jwt.sign({sub: user.id}, config.secret,
            {expiresIn: 8640000});

        res.status(200).json({
            token:token ,
            mensaje:"Sesion Iniciada"
        });

    }else {
        res.status(203).json({ mensaje: "Usuario o contraseña incorrectos"})
    }
}

UserController.edit=(req, res)=>{

    const user=req.decoded.sub

    User.findByIdAndUpdate(user, { $set: req.body }, function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Datos actualizados" });
        }
    });
}

UserController.delete=(req, res)=>{

    const user=req.decoded.sub

    User.findByIdAndRemove(user, function(err, data) {
        if (err || !data) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            res.status(200).json({ status: "ok", data: "Se ha eliminado correctamente el usuario con id: "+user});

        }
    });
}

UserController.getMyProfile = (req, res) =>{

    const user =req.decoded.sub
    User.findById(user, function (err, user) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: user });
        }
    })
}

UserController.getOtherProfile = (req, res) =>{

    const user =req.decoded.sub
    User.findById(user, function (err, user) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: user });
        }
    })
}


module.exports=UserController
