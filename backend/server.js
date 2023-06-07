const express = require('express');
const cors = require('cors');
const connectDb = require('./Db/databaseConnection')
const {ticketBookingController, seatController} = require('./Controller/ticketController')
const dotenv= require('dotenv');
const seeder = require('./seeder')
// Create an Express app
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



//api routes to get number to seats and response accordingly
app.post('/api/seatBook', ticketBookingController)
app.get('/api/getData', seatController)
app.delete('/api/resetData',()=> seeder())

//server running on port 5050

const Port = process.env.PORT || 5050
app.listen(Port, ()=>{
    console.log(`Server is listening on Port ${Port}`)
})







