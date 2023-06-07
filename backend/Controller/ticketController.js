const TrainSeat = require('../model/trainSeat')


const ticketBookingController=async(req, res)=>{
    console.log( Number(req.body.numberOfseats))
    const numberSeats= req.body.numberOfseats;

    try {
        
    if((numberSeats) > 7 || numberSeats<1){
        res.status(200).json({
            message :"Maximum Seat Allowed is 7"
        })
        return
    }
    
   

    //It will give Unbooked seats from starting 
    const seatAvailability = await TrainSeat.find({booked: false})
    
        //if Seat availability
        if(seatAvailability.length>=numberSeats){
           
            //Will give initial number of seats that is need to be booked by user
            const seatsTobeBooked= seatAvailability.slice(0, numberSeats)
            seatsTobeBooked.forEach(async(item) =>{
                item.booked=true;
                await item.save()
            })

            res.status(200).json({message : "seat booked", seatsTobeBooked})
        }
        else{
            res.status(200).json({message:`Only ${seatAvailability.length} seats are available`})
        }


    } 
    catch (error) {
        res.send(error.message)
    }
}


const seatController = async(req, res)=>{
    
    try {
        //getting all seats from db
        const totalSeat = await TrainSeat.find({})
        res.status(200).json(totalSeat)

    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: error.message})
    }


}




module.exports={ticketBookingController, seatController}