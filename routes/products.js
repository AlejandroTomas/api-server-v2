const express = require('express');
const router = express.Router();
const Productos = require('../models/Products');



//Infinite Scroll
router.get('/pages/:number/:inicio',async (req,res)=>{
    try {
        const products = await Productos.find();
        let nextIndex = 5*req.params.number;
        let nextPage = parseInt(req.params.number) + 1
        let a = 5*req.params.number  
        let b = req.params.inicio  
        res.json([...products.slice(b,a),{nextPage,nextIndex}])
    } catch (err) {
        res.json({message:err})
    }
});

//Get all products
router.get('/',async (req,res)=>{
    try {
        const products = await Productos.find();
        res.json(products)
    } catch (err) {
        res.json({message:err})
    }
});

//Submits a product
router.post('/',async (req,res)=>{
    const products = new Productos({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        img: req.body.img
    })
    try {
        const savedProducts = await products.save();
        res.json(savedProducts)
    } catch (err) {
        res.json({message:err})
    }
})

//Specific product
router.get('/:postId',async (req,res)=>{
    try {
        const products = await Productos.find(); //busca todos los productos
        let found = [];
        let searchVariable= req.params.postId.toLocaleLowerCase()
        products.forEach(el=>{
            (el.name.toLocaleLowerCase().includes(searchVariable) || el.type.toLocaleLowerCase().includes(searchVariable))?found.push(el):""
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
*/
//*****************  TEST ******************
//Update a post
router.put('/:postId',async (req,res)=>{
    console.log(req.params.postId)
    try {
        const updatedPost = await Products.updateOne(
            { _id : req.params.postId },
            {$set:{
                nombre: req.body.nombre,
                vendedor: req.body.vendedor,
                precio: req.body.precio,
                img: req.body.img,
                envio: req.body.envio,
                calf: req.body.calf
            }}
            );
        res.json(updatedPost)
    } catch (err) {
        res.json({message:err,
        "err":"ocurrio un error"})
    }
}); 

module.exports = router;