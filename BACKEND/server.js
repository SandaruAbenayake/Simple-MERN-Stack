const express = require('express');
const colors = require("colors");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const connectDB = require('./db/conn')
require("dotenv").config();

//build database connection
dotenv.config();
connectDB();

// Local computer's running port
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Api is running");
});


//routers
const studentRouter = require("./routes/student");
app.use("/student",studentRouter);


//server starting to listning
const server = app.listen(PORT, console.log(`Server running on PORT ${PORT}...`.yellow.bold));

if (server) {
    console.log("Success".green.bold);
}

// app.use("/api/user", userRoutes);



module.exports = app;








