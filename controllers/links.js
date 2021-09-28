require('dotenv').config()
const express = require('express')
const app = express()
const linkModel = require('../model/links')
const user = require('../model/user')



exports.addLinks = (req,res)=>{
    var linkTitle = req.body.linkTitle
    var link = req.body.link
    var username = localStorage.getItem('loginUser')
    var instagram = req.body.instagram
    var facebook = req.body.facebook
    var linkedin = req.body.linkedin
    var github = req.body.github
    var twitter = req.body.twitter
    var email = req.body.email
    if(link != undefined && linkTitle != undefined){
        var links={
            linkTitle:linkTitle,
            link : link
        }
    }
    linkModel.findOne({username:username}).exec((err,data)=>{
        if(data){
            if(linkTitle != undefined && link != undefined){
                var updateLinks = linkModel.updateOne({_id:data._id},{$push:{links:links}},{new:true})
                updateLinks.exec((err,data)=>{
                if(err){
                    return res.status(400).json({
                        err:err
                    })
                }
                // res.json({
                // message:"links Updated Successfully",
                // data
                // })
                return res.redirect('/dashboard')
            })
        }
        else{
            linkModel.findByIdAndUpdate({_id:data._id},{instagram:instagram,github:github,facebook:facebook,twitter:twitter,email:email,linkedin:linkedin},{new:true}).exec((err,data)=>{
                if(err){
                    return res.status(400).json({
                        err:err
                    })
                }
                // res.status(200).json({
                // message:"links Updated Successfully",
                // data
                // })
                res.redirect('/dashboard')
            })
        }
        }
        else{
            user.findOne({username:username}).exec((err,data)=>{
                if(err){
                    return res.status(400).json({
                        err:err
                    })
                }
            var name = data.name
            var newLink  = new linkModel({
                links:links,
                name:name,
                username : username,
                instagram : instagram,
                facebook : facebook,
                linkedin : linkedin,
                github : github,
                twitter : twitter,
                email : email

            })
            newLink.save((err,data)=>{
                if(err){
                    return res.status(400).json({
                        err:err
                    })
                }
                res.redirect('/dashboard')
            })
        })
        }
    })
}
