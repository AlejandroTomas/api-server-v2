const express = require('express');
const router = express.Router();
const Users = require('../models/Users')

//Encriptar
function hash(string){
    if(!string)throw {status:"Valor requerido",statusText:"Valor necesario de contraseña y usuario"}; //Capturar el error
    let abecedario = 'abcdefghijklmnñopqrstuvwxyz';
    let encript =    'jkop/8509?¡¿}{)(%&+-wsetv[]'
    
    let a = Array.from(string,s=>s)
    let newArray="";
  
    a.forEach(el=>{
      let point = abecedario.indexOf(el)
      if(point!=-1){
        newArray+=encript[point]
      }else{
        newArray+=el
      }
      
    });
   return newArray.replace('}','ul@:').replace('/','^zy').replace('9','!gf').replace('(','\<dch176');
}
//Desencriptar
function desHash(string){
        let abecedario = 'abcdefghijklmnñopqrstuvwxyz';
        let encript =    'jkop/8509?¡¿}{)(%&+-wsetv[]';
      
        let b = string.replace('ul@:','}').replace('^zy','/').replace('!gf','9').replace('\<dch176','(')
        let a = Array.from(b,s=>s)
        let newArray="";
            
            a.forEach(el=>{
            let point = encript.indexOf(el)
            if(point!=-1){
                newArray+=abecedario[point]
            }else{
                newArray+=el
            }
            
            });
        return newArray
}

//Solo descomentar en desarrollo
router.get('/',async (req,res)=>{
    try {
        const users = await Users.find();
        res.json(users)
    } catch (err) {
        res.json({message:err})
    }
});  

/* Buscar un usuario en especifico */
router.post('/session',async (req,res)=>{
    try {
        const usuario = await Users.findOne({"userName":req.body.userName}); //Donde usuraio sea igual a req.body.usuario
        if(usuario == null)throw {response:400,status:"Valores incorrectos",statusText:"Usuario no Existe"};
        if(desHash(req.body.password) == desHash(usuario.password)){
            res.json(usuario)
        }else{
            throw {response:400,status:"Valores incorrectos",statusText:"Contraseña incorrecta"};
        }
    } catch (err) {
        res.json({message:err})
    }
});


/* Subir un usuario */
router.post('/',async (req,res)=>{
    try {
        const userExists = await Users.findOne({"userName":req.body.userName});
        
        if(userExists != null) throw {response:400,status:"Usuario Existe",statusText:"Usuario Existe"};
        console.log("usuario creado")
        const user = new Users({
            userName: req.body.userName,
            userAdress:req.body.userAdress,
            userPhone: req.body.userPhone,
            password: hash(req.body.password),
        });
        const savedUser = await user.save();
        res.json(savedUser)
    } catch (err) {
        res.json({message:err})
    }
})

/* Buscar pedidos de un usuario  */
router.post('/pedidos',async (req,res)=>{
    try {
        const usuario = await Users.findOne({"_id":req.body._id}); //Donde usuraio sea igual a req.body.usuario
        if(usuario == null)throw {response:400,status:"Valores incorrectos",statusText:"usuario no existe"};
        if(desHash(req.body.password) == desHash(usuario.password)){
            let { pedidos } = usuario
            res.json(pedidos)
        }else{
            throw {response:400,status:"Valores incorrectos",statusText:"Contraseña incorrecta"};
        }
    } catch (err) {
        res.json({message:err})
    }
});


/* Cambiar direccion del usuario */
router.put('/adress/',async (req,res)=>{
    try {
        const usuario = await Users.findOne({_id:req.body._id}); //Obtenemos el usuario por su id
        
        if(desHash(req.body.password)==desHash(usuario.password)){ //Comprobamos la contraseña y el token

            const updatedUsuario = await usuario.updateOne(    //ACTUALIZAMOS
                    {$set: {
                        userAdress:req.body.userAdress
                    }
            });
            res.json({response:202,updatedUsuario,val:req.body.option})

        }else{
            throw {response:400,status:"Valores incorrectos",statusText:"Token incorrecto, si es un error favor de reportar"};
        }
    } catch (err) {
        console.log(err)
        res.json({message:err,
        "err":"ocurrio un error"})
    }
});


/* Cmabiar datos del usuario */
router.put('/update',async (req,res)=>{
    try {
        const usuario = await Users.findOne({_id:req.body._id}); //Obtenemos el usuario por su id
        
        if(desHash(req.body.password)==desHash(usuario.contraseña)){ //Comprobamos la contraseña y el token

            const updatedUsuario = await usuario.updateOne(    //ACTUALIZAMOS
                    {$set: {
                        userName:req.body.usuarioChange,
                        userAdress:req.body.userAdress,
                        userPhone:req.body.userPhone
                    }
            });
            res.json({response:202,updatedUsuario,val:req.body.option})

        }else{
            throw {response:400,status:"Valores incorrectos",statusText:"Token incorrecto, si es un error favor de reportar"};
        }
    } catch (err) {
        console.log(err)
        res.json({message:err,
        "err":"ocurrio un error"})
    }
});


//subir pedido al usuario
//Adjuntar pedido a negocio
router.put('/order/:postId',async (req,res)=>{
    //console.log(req.params.postId)
    try {
        const updatedPost = await Users.updateOne(
            { _id : req.params.postId },
            {$push:{
                pedidos: req.body.orderUser,
            }}
            );
        res.json(updatedPost)
    } catch (err) {
        console.log(err)
        res.json({message:err,"err":"ocurrio un error"})
    }
}); 

module.exports = router;