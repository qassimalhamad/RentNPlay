const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



// router.get('/', async (req, res) => {

//     try {
//         const users = await User.findById(req.session.user._id);
//         res.render('games/index.ejs' , {
//             games : currentUser.games,
//         })
//     } catch (error) {
//       console.log(error)
//       res.redirect('/')
//     }
//   });

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'games');

    const allGames = [];
    users.forEach(user => {
      user.games.forEach(game => {
        allGames.push(game);
      });
    });

    res.render('games/index.ejs', {
      games: allGames
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});




router.get('/', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('games/index.ejs' , {
          games : currentUser.games,
      })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

router.get('/allgames' , async (req, res , next) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    res.render('games/allgames.ejs' , {
      games : currentUser.games
    })

  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})



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

 

router.get('/:gameId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const game = currentUser.games.id(req.params.gameId);
    res.render('games/show.ejs', {
      game: game,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }

});

router.delete('/:gameId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.games.id(req.params.gameId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/games`);
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

// controllers/games.js

router.get('/:gameId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const game = currentUser.games.id(req.params.gameId);
    res.render('games/edit.ejs', {
      game: game,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

// controllers/games.js`

router.put('/:gameId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const game = currentUser.games.id(req.params.gameId);
    game.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/games/${req.params.gameId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

// router.get('/profile' ,async(req , res, next ) => {
//   try {
//     const currentUser = await User.findById(req.session)
//   } catch (error) {
    
//   }
// })


module.exports = router;
