const mongoose = require('mongoose')
const colors = require("colors");


// MongoDB Database Connection
const connectDB = async () => {
    //getting database connection with mongodb url
    try {
      mongoose.set("strictQuery", false);
      
      const conn = await mongoose.connect(process.env.MONGODB_URL);
  
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
      //send error message
      console.log(`Error: ${error.message}`.red.bold);
      process.exit();
    }
  };
  
  module.exports = connectDB;