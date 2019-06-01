// Required Modules
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

// Exported Modules
const keys = require('./keys');
const User = require('../models/user-model');

// Checking whether the user is still logged in or not
// This will help not to open profile page if the user is not logged in
passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser((id,done) => {
  User.findById(id).then((user) => {
      done(null,user);
  });
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  },(accessToken,refreshToken,profile,done) =>{
    User.findOne({googleId:profile.id}).then((currentUser) => {
      if(currentUser){
        console.log('User is:',currentUser);
        done(null,currentUser);
      }else {
        new User({
          username:profile.displayName,
          googleId:profile.id,
          thumbnail:profile._json.picture
        }).save().then((newUser) => {
          console.log('New user created: ' + newUser);
          done(null,newUser);
        });
      }
    })

  })
)
