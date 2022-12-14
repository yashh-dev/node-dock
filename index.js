const express = require('express')
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const postRouter = require("./routes/postRoutes")

app.use(express.json( ))
const {MONGO_USER,MONGO_PASSWORD,MONGO_IP,MONGO_PORT} = require('./config/config')

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose.set({strictQuery:true})

function connectRetry(){
    mongoose.connect(
        mongoURL
    ).then(()=>{
        console.log('succesfully connected to mongodb');
    }).catch((e)=>{
        console.log("There was a problem");
        console.log(e);
        connectRetry()
    });
}

connectRetry()

app.use(morgan('tiny'))
app.get('/',(req,res)=>{
    res.send(`<h1>Bonjour</h1> you are in ${process.env.NODE_ENV} env`);
})

app.use("/api/v1/posts",postRouter)

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server running on ${port}`);
})