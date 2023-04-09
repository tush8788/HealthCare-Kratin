const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
// import DB
const db = require('./config/mongoose');
// import passport 
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
// import session cookie
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
// notification 
const connectFlash = require('connect-flash');
const notification = require('./config/notification');
//env
const dotenv = require('dotenv').config();
// port
const port = process.env.PORT||8000;

const app = express();
//set up ejs 
app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractScripts',true);
app.set('layout extractStyles',true);

app.use(expressLayout);
//body-parser for form data
app.use(bodyParser.urlencoded({extended:false}));
//access static files
app.use(express.static('./assets'));
//create session cookie
app.use(expressSession({
    name:"Helthcare",
    secret:"any_key",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*100
    },
    store:mongoStore.create({
        mongoUrl:process.env.MONGO_URL||'mongodb://localhost/kratin-helth',
        autoRemove:false
    },function(err){
        console.log(err || "connect");
    })
}))
//passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//notification
app.use(connectFlash());
app.use(notification.setFlash);
//url handler
app.use('/',require('./routes/index'));
//listen
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up on port : ",port);
})