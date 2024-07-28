const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



router.get('/', async (req, res) => {
    try {
      res.render('games/index.ejs');
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  });

router.get('/new' , async (req , res , next) => {
    res.render('games/new.ejs')
})



router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);

      currentUser.games.push(req.body);

      await currentUser.save();

      res.redirect(`/users/${currentUser._id}/games`);
    } catch (error) {

      console.log(error);
      res.redirect('/')
    }
  });


module.exports = router;