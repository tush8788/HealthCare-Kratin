const userDB = require('../model/user');
const BmiCalculator = require('../score/BMICalculetor');
const BloodPressureCalculator = require('../score/BloodPressureCalculetor');

// home page
module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render('home',{
        title:"Home"
    })
}

// admin sign in page
module.exports.signInPageAdmin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/admin/dashboard');
    }
    return res.render('signin',{
        title:"AdminSignIn",
        isAdmin:true,
        url:'/admin/createSession'
    })
}

//admin sign up page
module.exports.signUpPageAdmin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/admin/dashboard');
    }

    return res.render('signup',{
        title:"AdminSignUp",
        isAdmin:true,
        url:'/admin/create'
    })
}

// user sign in page
module.exports.signInPageUser=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard');
    }
    return res.render('signin',{
        title:"UserSignIn",
        isAdmin:false,
        url:'/user/create-session'
    })
}

//user sign up page
module.exports.signUpPageUser=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard');
    }
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
            if(req.body.isAdmin=="true"){
                req.flash('success','admin create successfully..!');
                return res.redirect('/admin/signin');
                
            }
            else{
                req.flash('success','user create successfully..!');
                return res.redirect('/user/signin');
            }
        }

        
        
        if(req.body.isAdmin=="true"){
            req.flash('error','user already exist..!');
            return res.redirect('/admin/signin');
        }
        else{
            req.flash('error','user already exist..!');
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
    req.flash('success','Successfully Signin..!');
    if(req.body.isAdmin=="true"){
        return res.redirect('/admin/dashboard');
    }
    else{
        return res.redirect('/user/dashboard');
    }
}

//signout
module.exports.signout = function(req,res){
    req.logout((err)=>{
        if(err){
            console.log(err);
        }
        req.flash('success','Successfully Signout..!');
        return res.redirect('/');
    })
}

//BMI calculetor
module.exports.BMICal=function(req,res){
    // console.log(req.body);
    let bmi =BmiCalculator.BMI(req.body.height,req.body.weight);
    // console.log(bmi);
    if(req.xhr){
        return res.status(200).json({
            BMI:bmi
        })
    }
    return res.redirect(back);
}

//blood pressure Calculetor
module.exports.bloodCal=function(req,res){
    // console.log(req.body);
    let BloodPressure = BloodPressureCalculator.BloodPressure(req.body.systolic,req.body.diastolic);
    // console.log(BloodPressure);
    if(req.xhr){
        return res.status(200).json({
            BloodPressure:BloodPressure
        })
    }
    return res.redirect(back);

}