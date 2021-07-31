// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
var Schema=mongoose.Schema;

// Usaremos los esquemas

// Creamos el objeto del esquema y sus atributos
const Refuge = mongoose.model('refuges',{
    user: { type: Schema.ObjectId, ref: 'users' },
    ciudad:{type:String, required:true},
    nombre:{type:String, required:true},
    long:{type:Number, required:true},
    lat:{type:Number, required:true},
    ratings:[{
        user: {type: Schema.Types.ObjectId, ref: 'users'},
        comment: {type:String, required:true},
        rating:  {type:Number, required:true},
        date: { type: Date, default: Date.now() },
        aproved : {type:Boolean}
    }]

})

// Exportamos el modelo para usarlo en otros ficheros
module.exports = Refuge
