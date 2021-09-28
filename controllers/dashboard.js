require('dotenv').config()
const express = require('express')
const app = express()
const linkModel = require('../model/links')


exports.dashboard = (req,res)=>{
    var username = localStorage.getItem('loginUser')
    linkModel.findOne({username:username}).exec((err,data)=>{
        if(err){
            return res.status(400).json({
                err:err
            })
        }
        res.render('dashboard',{loginUser:localStorage.getItem('loginUser'),records:data})
    }) 
}