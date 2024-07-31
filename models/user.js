const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    game : {
        type : String ,
        required : true
    },
    price : {
        type : String ,
        required :true ,
    },

    purchaseType : {
        type : String ,
        enum: ['sell', 'rent' , 'sold' , 'rented'] , //Has mistake, there was a space in the sell 
    }

})

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true ,
    }, 
    password : {
        type : String ,
        required : true ,
    },

    contact : {
        type : String ,
        required : true ,
    },

    games: [gameSchema]
})

const User = mongoose.model('User' , userSchema);

module.exports = User ; 