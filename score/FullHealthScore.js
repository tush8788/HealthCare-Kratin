module.exports.checkScore = function (healthR) {


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
    // console.log(h2);
    // console.log(parseFloat(healthR.weight));
    let bmi=parseFloat(healthR.weight)/h2;
    // console.log(bmi)
    data = {
        BMI: bmi,
        systolicBP: parseInt(healthR.systolicPressure),
        diastolicBP: parseInt(healthR.diastolicPressure),
        physicalActivity: parseInt(healthR.exercise),
        sleepQuality: parseInt(healthR.sleep),
        alcohol:(10-parseInt(healthR.alcohol)),
        smoking:(10-parseInt(healthR.smoking))
    };
    
    // Define the data for each metric
    // const data = {
    //     BMI: 25,
    //     systolicBP: 120,
    //     diastolicBP: 80,
    //     physicalActivity: 5,
    //     sleepQuality: 7,
    //     alcohol:(10-1),
    //     smoking:(10-1)
    // };

    // Normalize the data for each metric
    const normalizedData = {
        BMI: (data.BMI - 18) / (40 - 18),
        bloodPressure: (data.systolicBP + data.diastolicBP) /2/100,
        physicalActivity: data.physicalActivity / 10,
        sleepQuality: data.sleepQuality / 10,
        alcohol:data.alcohol/10,
        smoking:data.smoking/10
    };

    // console.log("normalize data :" , normalizedData)
    // Calculate the score for each metric
    const scores = metrics.map(metric => {
        const normalizedValue = normalizedData[metric.name];
        // console.log(normalizedValue)
        const score = normalizedValue * metric.weight;
        return score;
    });
    // console.log(scores)
    // Sum the scores to calculate the overall health score
    const overallScore = scores.reduce((total, score) => total + score, 0);

    // Assign a health level based on the overall score
    let healthLevel;
    if (overallScore >= 0.8) {
        healthLevel = "excellent";
    } else if (overallScore >= 0.6) {
        healthLevel = "good";
    } else if (overallScore >= 0.4) {
        healthLevel = "fair";
    } else {
        healthLevel = "poor";
    }
    // console.log(bmi)
    // Output the results
    // console.log(`Overall Health Score: ${overallScore}`);
    // console.log(`Health Level: ${healthLevel}`);
    // return {score:overallScore,level:healthLevel};
    return {overallScore,bmi};
}







