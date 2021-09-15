const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    vendedor: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    envio: {
        type: Boolean,
        required: true,
        default: false
    },
    calf: {
        type: Number,
        required: true,
        default: 1

    },
})

module.exports = mongoose.model('Products',ProductsSchema);