$('#BMIContainer').submit((e) => {
    e.preventDefault();
    // alert('click');
    let newArr = [], arr = $('#BMIContainer').serializeArray();

    arr.forEach(element => {
        console.log(element)
        newArr.push(element.value);
    });
    let h2 = newArr[0] * newArr[0];
    let BMI = newArr[1] / h2
    // console.log("BMI : ",newArr[1]/h2);

    $('#result-list').html(`<p>BMI is ${BMI.toFixed(2)}</p><p id="BMIScore">${BMI.toFixed(2)}</p>`)

    // console.log(newArr);
})

//chart

{window.feed = function (callback) {
    var tick = {};
    tick.plot0 = Math.ceil(350 + (Math.random() * 500));
    callback(JSON.stringify(tick));
};

var myConfig = {
    type: "gauge",
    globals: {
        fontSize: 25
    },
    plotarea: {
        marginTop: 80
    },
    plot: {
        size: '100%',
        valueBox: {
            placement: 'center',
            text: '%v', //default
            fontSize: 35,
            rules: [
                {
                    rule: '%v >= 30',
                    text: '%v<br>Obesity'
                },
                {
                    rule: '%v >= 25 && %v <= 29.9',
                    text: '%v<br>Over weight'
                },
                {
                    rule: '%v >= 18.5 && %v <= 24.9',
                    text: '%v<br>Normal weight'
                },
                {
                    rule: '%v <= 18.4',
                    text: '%v<br>Under weight'
                }
            ]
        }
    },
    tooltip: {
        borderRadius: 5
    },
    scaleR: {
        aperture: 180,
        minValue:0,
        maxValue:40,
        step: 40,
        center: {
            visible: false
        },
        tick: {
            visible: false
        },
        item: {
            offsetR: 0,
            rules: [
                {
                    rule: '%i == 9',
                    offsetX: 15
                }
            ]
        },
        labelse: ['0','5','10','15','20','25','30','35','40'],
        // labels:['300','','','','','','580','640','700','750','','850'],
        rules: {
            size: 50,
            rules: [
                {
                    rule: '%v <= 18.4',
                    backgroundColor: '#E53935'
                },
                {
                    rule: '%v >= 18.5 && %v <= 24.9',
                    backgroundColor: '#03fc0b'
                },
                {
                    rule: '%v >= 25 && %v <= 29.9',
                    backgroundColor: '#f2b0a5'
                },
                {
                    rule: '%v >= 30',
                    backgroundColor: '#751606'
                }
            ]
        }
    },
    refresh: {
        type: "feed",
        transport: "js",
        url: "",
        interval: 1500,
        resetTimeout: 1000
    },
    series: [
        {
            
            values: [parseFloat($('#BMIScore').text()).toFixed(2)*1], // starting value
            backgroundColor: 'black',
            indicator: [10, 10, 10, 10, 0.75],
            animation: {
                effect: 2,
                method: 1,
                sequence: 4,
                speed: 900
            },
        }
    ]
};

zingchart.render({
    id: 'myBMI',
    data: myConfig,
    height: 500,
    width: '100%'
});


}

