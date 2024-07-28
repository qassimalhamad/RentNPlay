// Imports
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();
const session = require('express-session');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

//Controllers
const authCtrl = require('./controllers/auth.js')
const gamesCtrl = require('./controllers/games.js')

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', ()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
// Middleware

app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

}))

app.use(passUserToView);

app.get('/' , async (req , res , next) => {
    if(req.session.user){
        res.redirect(`/users/${req.session.user._id}/games`)
    }else{
        res.render('index.ejs')
    }
     

})

app.use('/auth' , authCtrl) 
app.use('/games', gamesCtrl )

app.use(isSignedIn);
app.use('/users/:userId/games', gamesCtrl); 

// Routes





app.listen(port , () => {
    console.log(`The Express app is working on port ${port}!`)
})

