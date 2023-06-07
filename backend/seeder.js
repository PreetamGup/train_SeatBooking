
const TrainSeat = require('./model/trainSeat')

const seeder = async()=>{

    // await TrainSeat.deleteMany()

    const data = await TrainSeat.find({});

    if(data.length!==0){
        await TrainSeat.updateMany({booked:false})
    }
    else{
        let seats=[]
        for (let i = 1; i <= 80; i++) {
            if(i%6==0){
                seats.push({
                    seatNumber: i,
                    booked: true,
                    });
            }else{
                seats.push({
                    seatNumber: i,
                    booked: false,
                    });
            }
        }
    
        const res= await TrainSeat.insertMany(seats);
    }
   
}


module.exports= seeder
