const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
//passport confs

require('./config/passport')(passport);



const auth = require('./routes/auth');

const app = express();

app.get('/', (req,res)=> {
    res.send("!!!");
})


app.use('/auth', auth);

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});