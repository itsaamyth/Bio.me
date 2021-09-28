const express = require('express')
var router = express.Router()
var path = require('path');
// var loginUser = localStorage.getItem('loginUser')
const {addLinks,getLinks} = require('../controllers/links')
const linkModel = require('../model/links')
const {profile} = require('../controllers/profile')
const {dashboard} = require('../controllers/dashboard')




console.log(localStorage.getItem('loginUser'))
router.get('/dashboard',dashboard)

router.get('/:username',profile)

router.post('/addLink',addLinks)





module.exports = router