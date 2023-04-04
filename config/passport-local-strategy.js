const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserDB = require('../model/user');

passport.use(new localStrategy({
    usernameField:'email',
    passReqToCallback:true
},async function(req,email,password,done){
    try{
        let user;
        if(req.body.isAdmin=='true'){
            user=await UserDB.findOne({email:email,isAdmin:true});
        }
        else if(req.body.isAdmin=="false"){

            user=await UserDB.findOne({email:email,isAdmin:false});
        }

        
        if(!user || password != user.password){
            console.log("Invaild email or password");
            return done(null,false);
        }

        return done(null,user);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
}));


passport.serializeUser((user,cb)=>{
    cb(null,user.id);
})

passport.deserializeUser( async (id,cb)=>{
    try{
        let user = await UserDB.findById(id);
        if(!user){
            return cb(null,false);
        }
        return cb(null,user);
    }
    catch(err){
        return cb(err);
    }
})

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

//addisional checking user is admin or not 
passport.isAdminOrNot=function(req,res,next){
    if(req.user.isAdmin==true){
        return next();
    }
    return res.redirect('/signout');
}

//addisional checking req user is user or not 
passport.isUserOrNot=function(req,res,next){
    if(req.user.isAdmin==false){
        return next();
    }
    return res.redirect('/signout');
}