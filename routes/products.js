const express = require('express');
const router = express.Router();
const Productos = require('../models/Products');

//Obtener los productos de portada

//Obtener los de la pagina frontal
router.get('/frontpage',async (req,res)=>{
    try {
        const products = await Productos.find({tag:"frontPage"});
        res.json(products)
    } catch (err) {
        res.json({message:err})
    }
});

//Obtener las oferta del dia
router.get('/oferta',async (req,res)=>{
    try {
        const products = await Productos.find({type:"oferta"});
        res.json(products)
    } catch (err) {
        res.json({message:err})
    }
});


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
        img: req.body.img,
        quantityOnStock: req.body.quantityOnStock
    })
    try {
        const savedProducts = await products.save();
        res.json(savedProducts)
    } catch (err) {
        res.json({message:err})
    }
})

//Specific product
router.put('/search',async (req,res)=>{
    console.log(req.body.key)
    try {
        const s = req.body.key;
        const regex = new RegExp(s, 'i') // i for case insensitive
        const products = await Productos.find({ $or:[ {name : {$regex: regex}}, {type : {$regex: regex}}]});

        // let found = [];
        // let searchVariable= req.params.postId.toLocaleLowerCase()
        // products.forEach(el=>{
        //     (el.name.toLocaleLowerCase().includes(searchVariable) || el.type.toLocaleLowerCase().includes(searchVariable))?found.push(el):""
        // })
        res.json(products)
    } catch (err) {
        console.log(err)
        res.json({message:err})
    }
});

//Verificar stock todo el pedido (Falta en mejorarlo)
router.put('/verefyorder',async (req,res)=>{
    try {
        let a ={
            //status:"noStock", //Algun producto no tiene suficiente stock
            //status:"ok", //Todos los productos correctos en su stock
            status:"",
            payload:[
                // {
                //     _id:"647a8ac6e6228231b8de48c0", //El producto que no tiene estock y que hay que actualizar en el carrito en el front
                // }
            ],
            newListProducts:[]
        }
        const products = await Productos.find({"_id":req.body._ids});
        //const filters = await products.filter( product => !product.onStock);
        const filters = await products.filter( (product,index) =>  req.body.products[index].quantity > product.quantityOnStock);
        a.status = filters.length === 0 ? "ok" : "noStock"
        a.payload.push(...filters)
        if(a.status==="ok"){
            req.body.products.forEach(async(element,index) => {
                let count = await products[index].quantityOnStock - element.quantity ;
                let b = await Productos.updateOne(
                { _id : element._id},
                    {$set:{quantityOnStock: count}
                });
                
            });
            //updateOne
            // await Productos.updateMany({_id:req.body._ids}, 
            //     { 
            //         $set: { onStock : false}
            //         //$set: { quantityOnStock : quantityOnStock - quantity }
            //     })
        }

        // if(a.status==="ok"){
        //     a.newListProducts = await Productos.find();
        // }

        if(a.status!="ok"){
            a.newListProducts = await Productos.find();
        }
        // a.newListProducts = await Productos.find();
        res.json(a);
    } catch (err) {
        console.log(err)
        res.json({message:err,
            "err":"ocurrio un error"})
    }
});

//actualizar quantity Producto
router.put('/quantityupdate/:postId',async (req,res)=>{
    console.log(req.params.postId)
    try {
        const updatedPost = await Productos.updateOne(
            { _id : req.params.postId },
            {$set:{
                quantityOnStock: req.body.quantityOnStock,
            }
        });
        res.json(updatedPost)
    } catch (err) {
        console.log(err)
        res.json({message:err,
        "err":"ocurrio un error"})
    }
});





module.exports = router;