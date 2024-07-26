const express = require('express')

const router = express.Router()  //Similer to const app = express()

router.get('/sign-up' , (req , res , next) => {
    res.render('auth/sign-up.ejs')
})

router.get('/sign-in' , (req , res , next) => {
    res.render('auth/sign-in.ejs')
})
module.exports = router;