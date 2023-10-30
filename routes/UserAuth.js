const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const router = express.Router();
router.post("/register",async(req,res)=>{
    try{
        const {email,username,password} = req.body
        let EmailExists = await User.findOne({email})
        let UsernameExists = await User.findOne({username})
        if(EmailExists){
            return res.status(401).json({message:"Email Exists"})
        }
        if(UsernameExists){
            return res.status(401).json({message:"Username Exists"})
        }
         
    const saltRounds = 10;
 
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) throw new Error("Internal Server Error");
 
      let user = new User({
        email:email,
        hash_password:hash,
        username:username
      });
 
      // Save user to database
      user.save().then(() => {
        res.json({ message: "User created successfully", user });
      });
    });
        
    }catch(error){
        return res.status(401).send(error.message);
    }
})



router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
   
      let user = await User.findOne({ email });
   
      if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
   
      bcrypt.compare(password, user.hash_password, (err, result) => {
        if (result) {
          return res.status(200).json({ message: "User Logged in Successfully" });
        }
        
        console.log(err);
        return res.status(401).json({ message: "Invalid Credentials" });
      });
    } catch (error) {
      res.status(401).send(err.message);
    }
  });

  module.exports = router