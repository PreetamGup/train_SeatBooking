
const TrainSeat = require('./model/trainSeat')

const seeder = async()=>{

    await TrainSeat.deleteMany()

        let seats=[]
        for (let i = 1; i <= 80; i++) {
            seats.push({
                seatNumber: i,
                booked: false,
                });
        }
            

        //To display some seats are already booked in dataBase
        const randomNumbers = [];
        for (let i = 0; i < 10; i++) {
            // Generate a random number between 1 and 80
            const randomNumber = Math.floor(Math.random() * 80) + 1;

            // Check if the random number is already in the array
            if (!randomNumbers.includes(randomNumber)) {
                // Push the random number into the array
                randomNumbers.push(randomNumber);
            }
        }

        //Marking those random generated Seatnumber as true in db
        for(let nums of randomNumbers){
            seats[nums].booked=true;
        }

            
        await TrainSeat.insertMany(seats);


    
    
   
}


module.exports= seeder
