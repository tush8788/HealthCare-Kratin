const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect('mongodb://localhost/kratin-helth');

const db = mongoose.connection;

db.on('error',()=>console.log("Error in connect DB"));

db.once('open',()=>console.log("DB Connected..!"));

module.exports=db;