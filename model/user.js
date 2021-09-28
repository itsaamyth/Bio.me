const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        require:true
    },
    name:{
        type:String
    },
    username:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    authType:{
        type:String,
        require:true
    },
    authLevel:{
       type:String,
       require:true 
    }
})

module.exports = mongoose.model('user',userSchema)