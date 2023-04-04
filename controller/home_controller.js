const userDB = require('../model/user');

// home page
module.exports.home = function(req,res){
    return res.render('home',{
        title:"Home"
    })
}

// admin sign in page
module.exports.signInPageAdmin=function(req,res){
    return res.render('signin',{
        title:"AdminSignIn",
        isAdmin:true,
        url:'/admin/createSession'
    })
}

//admin sign up page
module.exports.signUnPageAdmin=function(req,res){
    return res.render('signup',{
        title:"AdminSignUp",
        isAdmin:true,
        url:'/admin/create'
    })
}

// user sign in page
module.exports.signInPageUser=function(req,res){
    return res.render('signin',{
        title:"UserSignIn",
        isAdmin:false,
        url:'/user/create-session'
    })
}

//user sign up page
module.exports.signUnPageUser=function(req,res){
    return res.render('signup',{
        title:"UserSignUp",
        isAdmin:false,
        url:'/user/create'
    })
}

//create user and admin
module.exports.create=async function(req,res){
    try{
        let user = await userDB.findOne({email:req.body.email});

        if(!user){
            user = userDB.create(req.body);
            if(req.body.isAdmin){
                return res.redirect('/admin/signin');
            }
            else{
                return res.redirect('/user/signin');
            }
        }

        console.log("user already exist");

        if(req.body.isAdmin){
            return res.redirect('/admin/signin');
        }
        else{
            return res.redirect('/user/signin');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/');
    }
}

//create session of  admin and user
module.exports.createSession=function(req,res){
    if(req.body.isAdmin){
        return res.redirect('/admin/dashboard');
    }
    else{
        return res.redirect('/admin/dashboard');
    }
}

//signout
module.exports.signout = function(req,res){
    req.logout((err)=>{
        if(err){
            console.log(err);
        }
        return res.redirect('/');
    })
}