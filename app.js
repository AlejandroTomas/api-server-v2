const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =  require('body-parser')
const cors = require('cors')
const WebSocketServer = require('websocket').server;
require('dotenv/config')

//Middlewares
app.use(cors())
app.use(bodyParser.json());


//Import Routes
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const businessRoutes = require('./routes/business')


app.use('/productos', productsRoutes);
app.use('/usuarios', usersRoutes);
app.use('/business', businessRoutes);



app.set('port',process.env.PORT || 5000);

//ROUTES
app.get('/',async (req,res)=>{
    try {
        res.send('Complete')
    } catch (err) {
        res.json({message:err})
        res.send(err)
    }
});

// conectando la db
mongoose.set("strictQuery", false);
//yagulMarket
//db-yagul
//mongodb://localhost:27017
//
mongoose.connect("mongodb+srv://store:matoi8090@cluster0.ieu6f.mongodb.net/db-yagul?retryWrites=true&w=majority")
.then( async (db) => {
    console.log('db connect')
    
})
.catch(err=>console.log(err))

let server = app.listen(app.get('port'),()=>{
    console.log('Listen on port: '+app.get('port'))
})

//web socket

let webSocketServer = new WebSocketServer({
    httpServer:server
});

let connectionsUsers = [];
let connectionsBusiness = [];

webSocketServer.on("request",function (request) {
    console.log("Tenemos Visitas")
    let connection = request.accept("echo-protocol",request.origin);

    connection.sendUTF("Bienvenido");

    connection.on("message",function (message) {
        if(message.type == "utf8"){
            //console.log("Nuevo Mensaje:",message.utf8Data)
            //broadCast(message.utf8Data);
            let a = JSON.parse(message.utf8Data);

            if(a.typeConexion === "negocio"){
                connectionsBusiness.push(connection)

            }else if(a.typeConexion === "usuario"){
                connectionsUsers.push(connection)
            }else if(a.typeConexion === "pedido"){
                console.log("señal de pedido")
                if(connectionsBusiness.length!=0){
                    connectionsBusiness[0].sendUTF("new order");
                }else{
                    console.log("ningun negocio conectado")
                }

            }
            console.log("Conteo Negocios",connectionsBusiness.length)
            console.log("Conteo Usuarios",connectionsUsers.length)
        }
    });

    connection.on("close",function (e) {
        console.log("Termino: ",e)
        //Codigo 3000 para cerrar usuarios
        //Codigo 3001 para cerrar negocios
        if(e=== 3001){
            let deleteConeccion = connectionsBusiness.indexOf(connection)
            connectionsBusiness.splice(deleteConeccion , 1)
            console.log("Close Session business",connectionsBusiness.length)
            return 0;
        }

        if(e === 3000){
            let deleteConeccion = connectionsUsers.indexOf(connection)
            connectionsUsers.splice(deleteConeccion , 1)
            console.log("Close Session user",connectionsUsers.length)
            return 0;
        }
        //error 1006 al teminar la conexion buscar en los dos connection user and business 

        if(e === 1006 || e===1001 ){
            let deleteConeccion = connectionsBusiness.indexOf(connection)
            if(deleteConeccion === 0 ){
                connectionsBusiness.splice(deleteConeccion , 1)
            }else{
                connectionsUsers.splice(deleteConeccion , 1)
            }            
        }
        
    })

    function broadCast(message){
        connections.forEach(c => c.sendUTF(message));
    }

})

