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
    }
})

module.exports = mongoose.model('Productos',ProductosSchema);