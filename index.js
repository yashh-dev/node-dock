const express = require('express')
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {MONGO_USER,MONGO_PASSWORD,MONGO_IP,MONGO_PORT} = require('./config/config')

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose.set({strictQuery:true})
mongoose.connect(
    mongoURL
).then(()=>{
    console.log('succesfully connected to mongodb');
}).catch((e)=>{
    console.log("There was a problem");
    console.log(e);
})
app.use(morgan('tiny'))
app.get('/',(req,res)=>{
    res.send(`<h1>Bonjour</h1> you are in ${process.env.NODE_ENV} env`);
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`The sever is running on ${port}`);
})