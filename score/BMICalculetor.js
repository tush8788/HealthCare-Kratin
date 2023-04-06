module.exports.BMI=function(height,weight){
    let h2=parseFloat(height)*parseFloat(height);
    let bmi=parseFloat(weight)/h2;
    return bmi;
}