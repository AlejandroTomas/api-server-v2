const express = require('express');
const router = express.Router();
const Products = require('../models/Products')

//Get all products
router.get('/',async (req,res)=>{
    try {
        const products = await Products.find();
        res.json(products)
    } catch (err) {
        res.json({message:err})
    }
});

//Submits a product
router.post('/',async (req,res)=>{
    const products = new Products({
        nombre: req.body.nombre,
        vendedor: req.body.vendedor,
        precio: req.body.precio,
        img: req.body.img,
        envio: req.body.envio,
        calf: req.body.calf
    })
    try {
        const savedProducts = await products.save();
        res.json(savedProducts)
    } catch (err) {
        res.json({message:err})
    }
})

//*****************  TEST ******************
//Specific post
router.get('/:postId',async (req,res)=>{
    try {
        const products = await Products.find();
        let found = [];
        let searchVariable= req.params.postId.toLocaleLowerCase()
        products.forEach(el=>{
            (el.nombre.toLocaleLowerCase().includes(searchVariable))?found.push(el):""
        })
        res.json(found)
    } catch (err) {
        res.json({message:err})
    }
});

/* //Delete Post
router.delete('/:postId',async (req,res)=>{
    try {
        const removePost = await Post.remove({ _id : req.params.postId });
        res.json(removePost)
    } catch (err) {
        res.json({message:err})
    }
});


//Update a post
router.patch('/:postId',async (req,res)=>{
    try {
        const updatedPost = await Post.updateOne(
            { _id : req.params.postId },
            {$set:{
                title:req.body.title,
                description:req.body.description
            }}
            );
        res.json(updatedPost)
    } catch (err) {
        res.json({message:err})
    }
}); */

module.exports = router;