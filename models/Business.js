const mongoose = require("mongoose");
//Business
const BusinessSchema = mongoose.Schema({
    puesto: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    calf: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true,
        default:'../src/img/products/image-7.webp)'
    },
    envio: {
        type: Boolean,
        required: true,
        default: false
    },
    ruta: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Business',BusinessSchema);