// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
var Schema=mongoose.Schema;

// Usaremos los esquemas

// Creamos el objeto del esquema y sus atributos
const Pet = mongoose.model('pets',{
    imagen : {type: String },
    user: { type: Schema.ObjectId, ref: 'users' },
    //refugio:{type: Schema.ObjectId, ref: 'refugios'},
    ciudad:{type:String, required:true},
    raza:{type:String, required:true},
    color:{type:String, required:true},
    edad:{type:Number, required:true},
    nombre:{type:String, required:false},
    size:{type:String, required:true},
    tipo:{type:String, required:true}
})

// Exportamos el modelo para usarlo en otros ficheros
module.exports = Pet
