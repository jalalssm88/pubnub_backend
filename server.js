const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const User = require('./api/routes/user');
const Message = require('./api/routes/message');
// using body parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// db connecting
mongoose.connect('mongodb+srv://jalal:jalal123@nodeshop-pubba.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true}, ()=> {
    console.log('mongo db connected');
});

app.use('/user', User);
app.use('/message', Message);

// error handling
app.use((req, res, next)=> {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})
app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})

// set port
app.listen(5000, ()=>{
    console.log('server is running on port 5000');
});