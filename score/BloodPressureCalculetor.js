// this function create report of blood
module.exports.BloodPressure=function(systolic,diastolic){

    let classification;
    if (systolic<90 && diastolic<60) {
        classification = "Low blood pressure";
    }
    else if ((systolic>=90 && systolic<=120) && (diastolic>=60 && diastolic<=80)) {
        classification = "Normal blood pressure";
    }
    else if ((systolic>120 && systolic<=129) && diastolic<=80) {
        classification = "Prehypertension";
    }
    else if ((systolic>=130 && systolic<=139) && (diastolic>=80 && diastolic<=89) ) {
        classification = "Stage 1 hypertension";
    } 
    else if ((systolic>=140 && systolic<=179) && (diastolic>=90 && diastolic<=119)) {
        classification = "Stage 2 hypertension";
    } 
    else {
        classification = "Hypertensive crisis";
    }

    return classification;
}