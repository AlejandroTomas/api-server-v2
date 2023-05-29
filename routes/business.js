//Business
const express = require('express');
const router = express.Router();
const Business = require('../models/Business')

//Get business
router.get('/',async (req,res)=>{
    try {
        const business = await Business.find();
        res.json(business)
    } catch (err) {
        res.json({message:err})
    }
});

//Get all Orders of a business
router.get('/ordersmybusiness',async (req,res)=>{
    try {
        const business = await Business.find();
        res.json(business[0].ordersBusiness)
    } catch (err) {
        res.json({message:err})
    }
});



//Submits a business
router.post('/',async (req,res)=>{
    const business = new Business({
        nameBusiness: req.body.nameBusiness,
        calf: req.body.calf,
        adressBusiness: req.body.adressBusiness,
        ordersBusiness: req.body.ordersBusiness
    })
    try {
        const savedBusiness = await business.save();
        res.json(savedBusiness)
    } catch (err) {
        res.json({message:err})
    }
})

//Adjuntar pedido a negocio
router.put('/order/:postId',async (req,res)=>{
    console.log(req.params.postId)
    try {
        const updatedPost = await Business.updateOne(
            { _id : req.params.postId },
            {$push:{
                ordersBusiness: req.body.orderBusiness,
            }}
            );
        res.json(updatedPost)
    } catch (err) {
        console.log(err)
        res.json({message:err,"err":"ocurrio un error"})
    }
}); 


module.exports = router;