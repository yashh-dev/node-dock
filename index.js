const express = require('express')
const app = express()
const morgan = require('morgan');

app.use(morgan())
app.get('/',(req,res)=>{
    res.send(`<h1>Bonjour!!!!</h1> you are in ${process.env.NODE_ENV} env`);
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`The sever is running on ${port}`);
})