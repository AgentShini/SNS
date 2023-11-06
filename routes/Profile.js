const express = require("express")
const {sessions} = require("./Sessions")
const User = require("../models/User")
 const router = express.Router();



router.post("/edit",async (req,res)=>{
    if (!req.cookies) {
      res.status(401).json({message:"Unauthorized"})
      return
  }

  const sessionToken = req.cookies['session_token']
  if (!sessionToken) {
    res.status(401).json({message:"Unauthorized"})
    return
  }
  userSession = sessions[sessionToken]  
     // We then get the session of the user from our session map
      // that we set in the signinHandler
      if (!userSession) {
          // If the session token is not present in session map, return an unauthorized error
          res.status(401).json({message:"Unauthorized"})
          return
      }
      // if the session has expired, return an unauthorized error, and delete the 
      // session from our map
      if (userSession.isExpired()) {
          delete sessions[sessionToken]
          res.status(401).json({message:"Unauthorized"})
          return
      }

const user = userSession.username
console.log(userSession.username);
const {profile,bio} = req.body
const userExists = await User.findOne({username:user})

if (userExists){
  userExists.profile_picture = profile
  userExists.bio = bio
  userExists.save().then(()=>{
  res.status(200).json({message:userExists})
 })
}


  })

  module.exports = router
