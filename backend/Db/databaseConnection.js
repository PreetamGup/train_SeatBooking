const mongoose = require('mongoose');



const connectDb = async() =>{
  
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DataBase Connected');
  } 
  catch (error) {
    console.log(`Data Base Server Issue ${error}`);
  }
};

module.exports = connectDb;