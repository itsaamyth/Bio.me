require('dotenv').config()
const express = require('express')
const app = express()
const linkModel = require('../model/links')


exports.profile = (req,res)=>{
    var username = req.params.username
    console.log(username)
    linkModel.findOne({username:username}).exec((err,data)=>{
        if(err){
            return res.status(400).json({
                err:err
            })
        }
        res.render('profile',{records:data})
    })
}