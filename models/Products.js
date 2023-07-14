const mongoose = require("mongoose");

const ProductosSchema = mongoose.Schema({
    type: { //tipo de producto, verdura, fruta, lata, chile, etc ...
        type: String,
        required: true
    },
    name: {  //Nombre del producto
        type: String,
        required: true
    },
    price: { //Prercio normal del producto
        type: Number,
        required: true
    },
    priceOffert: { //Nombre de oferta producto
        type: Number,
        required: false,
        default:0,
    },
    img: { //Direccion de la imagen
        type: String,
        required: true
    },
    quantityOnStock:{ //Cantidad en stock
        type: Number,
        required: true
    },
    onStock:{ //Esta en stock ? true or false
        type:Boolean,
        required:false,
        default:true
    },
    tag:{ //Tag para distinguir el producto oferta, frontPage, normal etc ...
        type: String,
        required:false,
        default:"normal"
    },
    unit:{ //Tipo de unidad pieza, kilo, caja, bolsa
        type: String,
        required:true,
    }
})

module.exports = mongoose.model('Productos',ProductosSchema);