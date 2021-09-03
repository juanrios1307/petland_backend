const config = require("../config.json");
const User=require('../models/User')

const verifiyEmail = {};


verifiyEmail.getEmail= ((req, res, next) => {
    const {correo} = req.body;
    User.findOne({ correo: correo }, async function (err, user) {
        if (user==undefined || user.length==0) {
            next();
        }else{
            res.status(203).json({mensaje:"El correo: "+correo+" está en uso"})
        }
    })

});

module.exports=verifiyEmail;
