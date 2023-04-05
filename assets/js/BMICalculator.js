$('#BMIContainer').submit((e)=>{
    e.preventDefault();
    // alert('click');
    let newArr=[], arr=$('#BMIContainer').serializeArray();

    arr.forEach(element => {
        console.log(element)
        newArr.push(element.value);
    });
    let h2 = newArr[0]*newArr[0];
    let BMI = newArr[1]/h2
    // console.log("BMI : ",newArr[1]/h2);
    
    $('#result-list').html(`<p>BMI is ${BMI.toFixed(2)}</p>`)
  
    // console.log(newArr);
})