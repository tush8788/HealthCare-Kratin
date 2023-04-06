const UserDB = require('../model/user');
const HealthDB = require('../model/healthRecord');
const FullHealthScore = require('../score/FullHealthScore');

// dashboard
module.exports.dashboard= async function(req,res){
    let score={overallScore:0,bmi:0};
    
    if(req.user.medicalHistroy==true){ 
        let healthR = await HealthDB.findOne({user:req.user.id});
        if(healthR){
           score=FullHealthScore.checkScore(healthR);

        //    console.log(score);
        }
    }
    // console.log(scoreFind.checkScore(12));

    return res.render('./user/dashboard',{
        title:"Dashboard",
        healthScore:score.overallScore,
        BMI:score.bmi
    })
}

//blood page
module.exports.bloodPressurePage=function(req,res){
    return res.render('./user/bloodPressure',{
        title:"Blood Pressure"
    });
}

//BMI page
module.exports.BMI = function(req,res){
    return res.render('./user/BMICalculetor',{
        title:'BMI'
    })
}

//full health data page
module.exports.fullHealthData = async function(req,res){
    try{
        let healthData = await HealthDB.findOne({user:req.user.id});
        // console.log(healthData==null);
        if(healthData==null){
            return res.render('./user/fullHealth',{
                title:"FUll Health Info",
                url:'/user/createHealthRecord',
                healthData:healthData,
                btn:"Create"
            });
        }
        else{
            return res.render('./user/fullHealth',{
                title:"FUll Health Info",
                url:'/user/updateHealthRecord',
                healthData:healthData,
                btn:"Update"
            });
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.createHealthRecord = async function(req,res){
    try{
        // console.log(req.body);
        if(req.user.id == req.body.user){
            let newHealthRecord = await HealthDB.create(req.body);
            // if(newHealthRecord){
            //     await UserDB.findByIdAndUpdate(req.user.id,{medicalHistroy:true});
            // }
        }
        
        return res.redirect('/user/dashboard');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.updateHealthRecord = async function(req,res){
    try{
        if(req.body.user == req.user.id){
            let updatedData=await HealthDB.findByIdAndUpdate(req.params.id,req.body);
            if(updatedData){
                await UserDB.findByIdAndUpdate(req.user.id,{medicalHistroy:true});
            }
        }

        return res.redirect('/user/dashboard');
        // console.log(req.params);
        // console.log(req.body);
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}