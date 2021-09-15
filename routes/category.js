const express = require('express');
const router = express.Router();
const Category = require('../models/Category')

//Get all products
router.get('/',async (req,res)=>{
    try {
        const category = await Category.find();
        res.json(category)
    } catch (err) {
        res.json({message:err})
    }
});

//Submits a product
router.post('/',async (req,res)=>{
    const category = new Category({
        topic: req.body.topic,
        products: req.body.products
    })
    try {
        const savedCategories = await category.save();
        res.json(savedCategories)
    } catch (err) {
        res.json({message:err})
    }
})
module.exports = router;