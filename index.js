const express = require('express')
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")
const {MONGO_USER,MONGO_PASSWORD,MONGO_IP,MONGO_PORT, SESSION_SECRET, REDIS_PORT, REDIS_URL} = require('./config/config')
const cors = require('cors')
const session = require("express-session")
const redis = require("ioredis")
let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient({
    host : REDIS_URL,
    port : REDIS_PORT
})


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
app.enable("trust proxy")
app.use(cors())
app.use(session({
    name :'mac',
    store :new RedisStore({client : redisClient}),
    secret : SESSION_SECRET,
    cookie : {
        secure : false,
        resave : false,
        saveUninitialized : false,
        httpOnly : true,
        maxAge : 60000
    }

}))


app.use(express.json())


app.use(morgan('tiny'))
app.get('/api/v1',(req,res)=>{
    console.log("ran");
    res.send(`<h1>Bonjour</h1> you are in ${process.env.NODE_ENV} env`);
})

app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouter)

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server running on ${port}`);
})
