const mongoose = require("mongoose");

const   DireccionSchema = mongoose.Schema({
    calle:{
        type:String,
        required:true
    },
    Mz:{
        type:Number,
        required:true
    },
    Lote:{
        type:Number,
        required:true
    }
/*     contraseña:{
        type:String,
        required:true,
        match: /[a-z]/,
        minlength: 8
      } */
})

const UsersSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    direccion:{
        type:DireccionSchema,
        required:true
    },
    telefono: {
        type: Number,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    pedidos: {
        type: Array,
        required: false,
        default:[]
    }
})

module.exports = mongoose.model('Users',UsersSchema);