const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
  name:{
    type:String
  },
  username: {
    type: String,
    unique:true
  },
  links: [
    {
      linkTitle: {
        type: String,
      },
      link: {
        type: String,
      },
    },
  ],
  instagram: {
    type: String,
    default:''
  },
  facebook: {
    type: String,
    default:''
  },
  github: {
    type: String,
    default:''
  },
  linkedin: {
    type: String,
    default:''
  },
  email: {
    type: String,
    default:''
  },
  twitter: {
    type: String,
    default:''
  },
});

module.exports = mongoose.model("links", linkSchema);
