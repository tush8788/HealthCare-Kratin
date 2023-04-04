const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
    Name:{
        type:String,
    },
    gender:{
        type:String,
        enum:["male","female"]
    },
    birthDate:{
        type:Date,
        default:new Date()
    },
    alkohol:{
        type:Number,
    },
    smoking:{
        type:Number,
        default:0,
        min:0,
        max:10
    },
    height:{
        type:Number,
        default:1
    },
    weight:{
        type:Number,
        default:10
    },
    exercise:{
        type:Number,
        default:0,
        min:0,
        max:10
    },
    sleep:{
        type:Number,
        default:0,
        min:0,
        max:10
    },
    SystolicPressure:{
        type:Number
    },
    DiastolicPressure:{
        type:Number
    },
    bloodPressure:{
        type:Number
    }

});

const HelthRecord = mongoose.model("HealthRecord",healthSchema);

module.exports = HelthRecord;