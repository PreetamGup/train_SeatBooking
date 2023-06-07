const express = require('express');
const cors = require('cors');
const connectDb = require('./Db/databaseConnection')
const {ticketBookingController, seatController, resetController} = require('./Controller/ticketController')
const dotenv= require('dotenv');
const seeder = require('./seeder')



const app = express();

dotenv.config();


//connection to mongoDB
const callDb=async()=>{
    await connectDb();
    seeder();
}
callDb()

// connectDb()

// Enable CORS
app.use(cors());

// Parse the request body as JSON
app.use(express.json());

//Adding initial data in mongoDB



//api route to get number of seats and response accordingly
app.post('/api/seatBook', ticketBookingController)

//Api route to get all data from database
app.get('/api/getData', seatController)

//Api route to reset all data in database
app.delete('/api/resetData',resetController)

//server running on port 5050

const Port = process.env.PORT || 5050
app.listen(Port, ()=>{
    console.log(`Server is listening on Port ${Port}`)
})







