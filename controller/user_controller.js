// dashboard
module.exports.dashboard=function(req,res){
    return res.render('./user/dashboard',{
        title:"Dashboard"
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