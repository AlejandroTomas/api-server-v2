const mongoose = require("mongoose");
//Business
const BusinessSchema = mongoose.Schema({
    nameBusiness: {
        type: String,
        required: true
    },
    calf: {
        type: Number,
        default:0
    },
    adressBusiness:{
        type: Object,
        required: true
    },
    ordersBusiness: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model('Business',BusinessSchema);