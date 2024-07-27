const express = require('express')
const User = require('../models/user')
const router = express.Router()  //Similer to const app = express()
const bcrypt = require('bcrypt')



router.get('/sign-up' ,(req , res , next) => {
    res.render('auth/sign-up.ejs')
})


router.post('/sign-up' , async (req , res , next) => {{
    const userInDatabase = await User.findOne ({
        username : req.body.username
    })

    if(userInDatabase){
        return res.send('Invalid Username or Password')
    }

    if(req.body.password !== req.body.confirmPassword){
        return res.send(`Passwords don't match`)
    }

    const hashedPassword = bcrypt.hashSync(req.body.password , 10)
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.send(`Thanks for signing up ${user.username}`)
}})


router.get('/sign-in' ,  (req , res , next) => {
    res.render('auth/sign-in.ejs')

})

router.post('/sign-in' , async (req , res , next) => {
    const userInDatabase = await User.findOne ({
        username : req.body.username,
    })
    if(!userInDatabase){
        res.send('Login Failed!')
    }
    const validPassword = bcrypt.compareSync(
        req.body.password ,
        userInDatabase.password
    )

    if(!validPassword){
        res.send('Login failed')
    }

    req.session.user= {
        username : userInDatabase.username,
    };

    res.redirect('/')

})

router.get('/sign-out' , (req , res , next) => {
    req.session.destroy();
    res.redirect('/')
})

module.exports = router;