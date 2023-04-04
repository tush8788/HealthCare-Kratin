const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
const port = process.env.PORT||8000;

const app = express();

app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractScripts',true);
app.set('layout extractStyles',true);

app.use(expressLayout);

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('./assets'));

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

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up on port : ",port);
})