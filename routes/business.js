//Business
const express = require('express');
const router = express.Router();
const Business = require('../models/Business')

//Get all products
router.get('/',async (req,res)=>{
    try {
        const business = await Business.find();
        res.json(business)
    } catch (err) {
        res.json({message:err})
    }
});

//Submits a product
router.post('/',async (req,res)=>{
    const business = new Business({
        puesto: req.body.puesto,
        direccion: req.body.direccion,
        calf: req.body.calf,
        img: req.body.img,
        envio: req.body.envio,
        ruta: req.body.ruta
    })
    try {
        const savedBusiness = await business.save();
        res.json(savedBusiness)
    } catch (err) {
        res.json({message:err})
    }
})

module.exports = router;