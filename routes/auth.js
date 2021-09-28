const express = require('express')
var router = express.Router()
var path = require('path');
const passport = require('passport');
require('../controllers/passportSetup');
const {signup,checkEmail,login,googleAuthSignup} = require('../controllers/auth')



router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',login,(req,res)=>{
    res.render('login')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.post('/signup',checkEmail,signup,(req,res)=>{
    res.render('signup')
})

// Google Auth
router.get('/auth/google',passport.authenticate('google', {scope: ['email','profile']}));
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/auth/fail'}),googleAuthSignup)

router.get('/logout', (req, res, next) => {
    req.logout();
    console.log("User Logged Out")
    localStorage.removeItem('loginUser')
    res.redirect('/');
});



module.exports = router