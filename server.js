// Imports
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')


// let port;

// if(process.env.PORT){
//     port = process.env.PORT
// }else{
//     port = 3000;
// }

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', ()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
// Middleware

app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// Routes

app.listen(port , () => {
    console.log(`The Express app is working on port ${port}!`)
})
