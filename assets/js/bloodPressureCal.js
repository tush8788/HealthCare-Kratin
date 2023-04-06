// (data.systolicBP + data.diastolicBP) / 2 / 200

$('#bloodPressure').submit((e) => {
    e.preventDefault()
    
    let arr = $('#bloodPressure').serializeArray();
    let newArry=[];
    // let sum = 0;
    arr.forEach(element => {
        newArry.push(parseInt(element.value));
    });

    // BP = (sum / 3)

    let classification;
    // console.log(newArry);
    if (newArry[0]<90 && newArry[1]<60) {
        classification = "Low blood pressure";
    }
    else if ((newArry[0]>=90 && newArry[0]<=120) && (newArry[1]>=60 && newArry[1]<=80)) {
        classification = "Normal blood pressure";
    }
    else if ((newArry[0]>120 && newArry[0]<=129) && newArry[1]<=80) {
        classification = "Prehypertension";
    }
    else if ((newArry[0]>=130 && newArry[0]<=139) && (newArry[1]>=80 && newArry[1]<=89) ) {
        classification = "Stage 1 hypertension";
    } 
    else if ((newArry[0]>=140 && newArry[0]<=179) && (newArry[1]>=90 && newArry[1]<=119)) {
        classification = "Stage 2 hypertension";
    } 
    else {
        classification = "Hypertensive crisis";
    }

    $('#result-list').html(`<p>This is classified as ${classification}.</p>`);
})