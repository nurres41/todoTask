const express = require('express');
const mongoose = require('mongoose');

// cors installed because of localhost:3000 port to localhost:5600 req.
const cors = require('cors');

//For dotenv
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//To get data into json format
app.use(express.json());

//Port 
const PORT = process.env.PORT || 5600;

//use cors
app.use(cors())

//Import Routes
const TodoItemRoute = require('./routes/todoItems');

//Connect MongoDB
mongoose.connect(process.env.MONGO)
.then(()=>console.log("db connected"))
.catch(err => console.log(err))

app.use('/',TodoItemRoute);

//Add Port
app.listen(PORT, ()=>console.log("Server Connected"));