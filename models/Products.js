const mongoose = require("mongoose");

const ProductosSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    quantityOnStock:{
        type: Number,
        required: true
    },
    onStock:{
        type:Boolean,
        required:false,
        default:true
    },
    tag:{
        type: String,
        required:false,
        default:"normal"
    },
    unit:{
        type: String,
        required:true,
    }
})

module.exports = mongoose.model('Productos',ProductosSchema);