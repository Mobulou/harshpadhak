const { json } = require("express");
const users = require("../models/userSchema");
const moment = require("moment");

//create user
exports.userpost = async (req, res) => {
  //console.log(req.body)
  const { firstName, email, phoneNumber, gender, status } = req.body;
  if (!firstName || !email || !phoneNumber || !gender || !status) {
    res.status(400).json({ error: "All field are required" });
  }
  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(400).json({ error: "User already exits" });
    } else {
      const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const userData = new users({
        firstName,
        email,
        phoneNumber,
        gender,
        status,
        datecreated: dateCreate,
      });
      await userData.save();
      res.status(200).json(userData);
    }
  } catch {
    res.status(400).json({ error });
    console.log("catch block error");
  }
};

//get all Users

exports.getUsers = async (req, res) => {
    //search krne k liye list me se puch v
    const search=req.query.search ||""

    const query={
        firstName:{$regex:search,$options:"i"}
    }
    console.log(search)
  try {
    const usersData = await users.find(query);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};


//get single user
             //controllers k pass vala h
exports.getSingleuser= async (req,res)=>{
    const {id}=req.params;
    try{
        const singleUserData=await users.findOne({_id:id});
        res.status(200).json(singleUserData);
    }catch(error){
           res.status(400).json(error);
           console.log("catch block error");
    }

}

//delete user
exports.deleteuser=async(req,res)=>{
  const {id}=req.params;
  const sindleUserDataId = await users.findByIdAndDelete({ _id: id });
     res.status(200).json(sindleUserDataId);
  try{

  }catch(error){
          res.status(400).json(error);
          console.log("catch block error");
  }
}


//updateUser

exports.updateUser = async (req, res) => {
  
 // console.log(req.body);
  const { id } = req.params;
  const { firstName, email, phoneNumber, gender, status } = req.body;
  try {
    const dateupdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const updatedData = await users.findByIdAndUpdate(
      { _id: id },
      {
        firstName,
        email,
        phoneNumber,
        gender,
        status,
        dateupdated: dateupdated,
      },
      { new: true }
    );
    await updatedData.save();
    console.log("updatedData", updatedData);
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};