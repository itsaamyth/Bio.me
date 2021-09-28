require('dotenv').config()
const express = require('express')
const app = express()
const user = require('../model/user')
// const bcrypt = require('bcryptjs')
// var jwt = require('jsonwebtoken')
if (typeof localStorage === "undefined" || localStorage === null) { //npm- localStorage requirement 
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


exports.checkEmail=(req,res,next)=>{
    var email = req.body.email
    var checkexitemail=user.findOne({email:email});
    checkexitemail.exec((error,data)=>{
    if(data){
        return res.status(400).json({
            error:"Username Already Exists"
        })
    }
    next()
    })
}

exports.signup=(req,res)=>{
    var name  = req.body.name
    var email = req.body.email
    var username = req.body.username
    var password = req.body.password

    userSignup = new user({
        name:name,
        email:email,
        username:username,
        password:password,
        authType:"Website Form",
        authLevel:"User"
    })
    userSignup.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save user in the DB"
            })
        }
        localStorage.setItem('loginUser', username);
        res.redirect('/dashboard')
    })
}

exports.login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var checkUser = user.findOne({ username: username });
    checkUser.exec((err, data) => {
      if (!data) {
        res.status(404).json({
          message: "User not Found . Auth Failed !!",
        });
      } else {
        var objId = data._id;
        var checkAuth = data.authType
          if (data.password == null) {
            res.json({
              message: `Different Auth Type. Please login with ${checkAuth}`,
              email: email,
              authType: checkAuth,
              id: objId,
            });
          } else {
            // var encryPassword = data.password;
            // if (bcrypt.compareSync(password, encryPassword)) {
            //   var token = jwt.sign(
            //     {
            //       email: email,
            //       objid: objId,
            //     },
            //     process.env.SECRET,
            //     { expiresIn: "2700s" }
            //   );
  
            //   res.status(201).json({
            //     message: "User logged in Succesfully",
            //     email: email,
            //     token: token,
            //   });
            // } 
            if(data.password == password){
            localStorage.setItem('loginUser', username);
            res.redirect('/dashboard')
            }
            else {
              res.status(404).json({
                message: "Wrong Password. Auth Failed !!",
              });
            }
          }
      }   
    });
  };

  exports.googleAuthSignup=(req,res)=>{
    var name = req.user.displayName
    var email = req.user.emails[0].value
    var username = email.replace("@gmail.com","")
    var checkexistemail=user.findOne({email:email});
    checkexistemail.exec((error,data)=>{
    if(data){
        var objId = data._id;
        var authType = data.authType
        if(authType == 'Google'){
            // var token = jwt.sign(
            //     {
            //       email: email,
            //       objid: objId,
            //     },
            //     process.env.SECRET,
            //     { expiresIn: "21600s" }
            // );
            
            //   return res.status(400).json({
            //     error:`Username Exists with ${authType}`,
            //     message : `You are now Successfully Logged in with ${authType}`,
            //     email:email,
            //     username:username,
            // })
            localStorage.setItem('loginUser', username);
            res.redirect('/dashboard')

        }
        else{
            return res.status(200).json({
                error:`Username Already Exists with ${authType}. Please login with ${authType}`
            })   
        }
    }
    else{
        userSignup = new user({
            name:name,
            email : email,
            password:null,
            username:username,
            authType:'Google',
            authLevel:'User'
        })
        userSignup.save((err,user)=>{
            if(err){
                return res.status(400).json({
                    err:"Not able to save user in the DB",err
                })
            }
            localStorage.setItem('loginUser', username);
            res.redirect('/dashboard')
        })
        console.log(email,req.isAuthenticated());
    }
    })
 }


