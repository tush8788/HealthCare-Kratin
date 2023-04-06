const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.set('strictQuery',false);

mongoose.connect(process.env.MONGO_URL||'mongodb://localhost/kratin-helth');

const db = mongoose.connection;

db.on('error',()=>console.log("Error in connect DB"));

db.once('open',()=>console.log("DB Connected..!"));

module.exports=db;