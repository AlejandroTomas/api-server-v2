const express = require('express');
const router = express.Router();
const Offers = require('../models/Offers')

//Get all products
router.get('/',async (req,res)=>{
    try {
        const oferta = await Offers.find();
        res.json(oferta)
    } catch (err) {
        res.json({message:err})
    }
});

//Submits a product
router.post('/',async (req,res)=>{
    const oferta = new Offers({
        nombre: req.body.nombre,
        vendedor: req.body.vendedor,
        precio: req.body.precio,
        img: req.body.img,
        envio: req.body.envio,
        calf: req.body.calf
    })
    try {
        const savedOferta = await oferta.save();
        res.json(savedOferta)
    } catch (err) {
        res.json({message:err})
    }
})

module.exports = router;