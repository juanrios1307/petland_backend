// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
var Schema=mongoose.Schema;

// Usaremos los esquemas

// Creamos el objeto del esquema y sus atributos
const Pet = mongoose.model('pets',{
    imagen : {type: String },
    user: { type: Schema.ObjectId, ref: 'users' },
    ciudad:{type:String, required:true},
    raza:{type:String},
    color:{type:String},
    edad:{type:Number},
    nombre:{type:String},
    size:{type:String},
    tipo:{type:String}
})

// Exportamos el modelo para usarlo en otros ficheros
module.exports = Pet
