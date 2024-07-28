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
        enum: ['sell ', 'rent'] ,
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
        required : false ,
    },

    games: [gameSchema]
})

const User = mongoose.model('User' , userSchema);

module.exports = User ; 