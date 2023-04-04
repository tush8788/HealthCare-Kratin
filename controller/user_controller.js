// dashboard
module.exports.dashboard=function(req,res){
    return res.render('./user/dashboard',{
        title:"Dashboard"
    })
}

//blood 
module.exports.bloodPressurePage=function(req,res){
    return res.render('./user/bloodPressure',{
        title:"Blood Pressure"
    });
}