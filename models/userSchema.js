const mongoose = require("mongoose");
const validator=require("validator");


//create user schema

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("not valid email");
      }
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum:["Active","Inactive"],
    default:"Active",
    
  },
  datecreated:Date,
  dateupdated:Date
});

//model defined
//model ka name vahi rakhna chahiye jo collection name ho
const users=new mongoose.model("users",userSchema);

module.exports=users;