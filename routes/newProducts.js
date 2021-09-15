const express = require('express');
const router = express.Router();
const NewProduct = require('../models/NewProduct')

//Get all NewProduct
router.get('/',async (req,res)=>{
    try {
        const newProduct = await NewProduct.find();
        res.json(newProduct)
    } catch (err) {
        res.json({message:err})
    }
});

//Submits a product
router.post('/',async (req,res)=>{
    const newProduct = new NewProduct({
        nombre: req.body.nombre,
        vendedor: req.body.vendedor,
        precio: req.body.precio,
        img: req.body.img,
        envio: req.body.envio,
        calf: req.body.calf
    })
    try {
        const savedNewProduct = await newProduct.save();
        res.json(savedNewProduct)
    } catch (err) {
        res.json({message:err})
    }
})

module.exports = router;