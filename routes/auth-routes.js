const router = require('express').Router();
const passport = require('passport');

//Auth login
router.get('/login',(req,res) => {
  res.render('login');
});

//Auth logout
router.get('/logout',(req,res) => {
  //passport.js handle
  //res.send('Logging out in with google');
  req.logout();
  res.redirect('/');
})

// Auth with google
router.get('/google',passport.authenticate('google',{
  scope:['profile']
}));

//callbackURL
router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
  //res.send(req.user);
  res.redirect('/profile/');
});

module.exports = router;