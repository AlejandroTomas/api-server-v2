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
const newProductsRoutes = require('./routes/newProducts')
const categoryRoutes = require('./routes/category')
const offersRoutes = require('./routes/offers')
const businessRoutes = require('./routes/business')

app.use('/products', productsRoutes);
app.use('/new', newProductsRoutes);
app.use('/category', categoryRoutes);
app.use('/offers', offersRoutes);
app.use('/business', businessRoutes);


app.set('port',process.env.PORT || 3000);

//ROUTES
app.get('/',(req,res)=>{
    res.send('we are on home')
});

// conectando la db
mongoose.connect(
    "mongodb+srv://store:matoi8090@cluster0.ieu6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true},
    ()=>console.log('DB conected'));

app.listen(app.get('port'),()=>{
    console.log('Listen on port: '+app.get('port'))
})