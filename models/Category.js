const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Category',CategorySchema);