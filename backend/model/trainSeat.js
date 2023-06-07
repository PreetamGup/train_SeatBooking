const mongoose = require("mongoose");

const trainSeatSchema = new mongoose.Schema({
    seatNumber:{
        type:Number,
        required:true
    },

    booked:{
        type:Boolean,
        default:false,
        required:true,
    }

})

const trainSeat = mongoose.model("trainSeat",trainSeatSchema)

 

module.exports = trainSeat;