const mongoose = require("mongoose");


// const  DireccionSchema = mongoose.Schema([{
//     street:{
//         type:String,
//         required:true
//     },
//     manzana:{
//         type:Number,
//         required:true
//     },
//     lote:{
//         type:Number,
//         required:true
//     }
// }])

const UsersSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    // userAdress:{
    //     type:DireccionSchema,
    //     required:true
    // },
    userAdress:{
        type: Array,
        required: true
    },
    userPhone: {
        type: Number,
        required: true
    },
    password: {
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