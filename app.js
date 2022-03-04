const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =  require('body-parser')
const cors = require('cors')
require('dotenv/config')

//Middlewares
app.use(cors())
app.use(bodyParser.json());


//Import Routes
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')


app.use('/productos', productsRoutes);
app.use('/usuarios', usersRoutes);



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
mongoose.connect(process.env.DB_CONNECTION)
.then( db => console.log('db connected'))
.catch(err=>console.log(err))

app.listen(app.get('port'),()=>{
    console.log('Listen on port: '+app.get('port'))
})