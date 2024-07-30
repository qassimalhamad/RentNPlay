const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
  try {

    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Failed to sign-up ');
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and Confirm Password must match');
    }
  

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
  
    await User.create(req.body);
  
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/sign-in', async (req, res) => {
  try {

    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('User Not in Database.');
    }
  
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send(' Invalid password.');
    }
  
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    };
  
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/profile', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/sign-in');
  }

  try {
    const user = await User.findById(req.session.user._id);
    res.render('auth/profile.ejs', { user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.post('/profile', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('auth/sign-in');
  }

  try {
    const user = await User.findById(req.session.user._id);

    const validOldPassword = bcrypt.compareSync(req.body.oldPassword, user.password);
    if (!validOldPassword) {
      return res.send('Invalid old password.');
    }

    if (req.body.newPassword !== req.body.confirmNewPassword) {
      return res.send('New Password and Confirm New Password must match.');
    }

    const hashedNewPassword = bcrypt.hashSync(req.body.newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;