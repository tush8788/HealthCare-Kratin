// this function show 
module.exports.checkScore = function (healthR) {
    //add matrics name and weight
    const metrics = [
        { name: "BMI", weight: 0.3 },
        { name: "bloodPressure", weight: 0.2 },
        { name: "physicalActivity", weight: 0.2 },
        { name: "sleepQuality", weight: 0.1 },
        { name: "alcohol", weight: 0.1 },
        { name:"smoking", weight: 0.1}
    ];

    //calculate BMI 
    let h2=parseFloat(healthR.height)*parseFloat(healthR.height);
    let bmi=parseFloat(healthR.weight)/h2;
   
    //adding data
    data = {
        BMI: bmi,
        systolicBP: parseInt(healthR.systolicPressure),
        diastolicBP: parseInt(healthR.diastolicPressure),
        physicalActivity: parseInt(healthR.exercise),
        sleepQuality: parseInt(healthR.sleep),
        alcohol:(10-parseInt(healthR.alcohol)),
        smoking:(10-parseInt(healthR.smoking))
    };

    // Normalize the data for each metric
    const normalizedData = {
        BMI: (data.BMI - 18) / (40 - 18),
        bloodPressure: (data.systolicBP + data.diastolicBP) /2/100,
        physicalActivity: data.physicalActivity / 10,
        sleepQuality: data.sleepQuality / 10,
        alcohol:data.alcohol/10,
        smoking:data.smoking/10
    };

    //check score of each 
    const scores = metrics.map(metric => {
        const normalizedValue = normalizedData[metric.name];
        const score = normalizedValue * metric.weight;
        return score;
    });

    // Sum the scores to calculate the overall health score
    const overallScore = scores.reduce((total, score) => total + score, 0);
    
    // Assign a health level based on the overall score
    // let healthLevel;
    // if (overallScore >= 0.8) {
    //     healthLevel = "excellent";
    // } else if (overallScore >= 0.6) {
    //     healthLevel = "good";
    // } else if (overallScore >= 0.4) {
    //     healthLevel = "fair";
    // } else {
    //     healthLevel = "poor";
    // }
    return {overallScore,bmi};
}







