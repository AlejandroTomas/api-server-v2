const mongoose = require("mongoose");

const NewProductSchema = mongoose.Schema({
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

module.exports = mongoose.model('newProducts',NewProductSchema);