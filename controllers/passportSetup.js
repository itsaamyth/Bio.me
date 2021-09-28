require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const facebookStrategy = require('passport-facebook').Strategy
const githubStrategy = require('passport-github').Strategy


passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:5000/auth/google/callback",
    // callbackURL:"http://localhost:8000/api/auth/google/callback",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile);
  }
));

// passport.use(new facebookStrategy({

//   // pull in our app id and secret from our auth.js file
//   clientID        : process.env.FACEBOOK_CLIENT_ID,
//   clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL     : "https://froshlink-backend.herokuapp.com/api/auth/facebook/callback",
//   profileFields   : ['email']

// },// facebook will send back the token and profile
// function(token, refreshToken, profile, done) {

//   console.log(profile)
//   return done(null,profile)
// }));

// passport.use(new githubStrategy({

//   // pull in our app id and secret from our auth.js file
//   clientID        : process.env.GITHUB_CLIENT_ID,
//   clientSecret    : process.env.GITHUB_CLIENT_SECRET,
//   callbackURL     : "https://froshlink-backend.herokuapp.com/api/auth/github/callback",

// },// facebook will send back the token and profile
// function(token, refreshToken, profile, done) {

//   console.log(profile)
//   return done(null,profile)
// }));