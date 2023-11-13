const express = require("express")
const uuid = require('uuid')
const Group = require("../models/Groups")
const GroupMembers = require("../models/GroupMembers")
const {sessions} = require("./Sessions")
const router = express.Router();


router.post("/createGroup",async(req,res)=>{
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
      const creator_id = userSession.user_id
      const{name,description} = req.body
      const access_code = uuid.v4();
      const group = new Group({
        name:name,
        description:description,
        creator_id:creator_id,
        access_code:access_code
      })
       await group.save()

       const newMember = new GroupMembers({
        group_id:group._id,
        access_code:access_code,

        members:{
          member_id:creator_id,
          name:userSession.username
        }})


        await newMember.save()
       res.status(200).json({message:group})
  })

  router.post("/joinGroup",async(req,res)=>{
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

      const {access_code} = req.body
      const user = userSession.user_id
      const joined = await GroupMembers.findOne({access_code:access_code,'members':{
        $elemMatch:{
          'name':userSession.username
        }
      }})

      if(joined){
        res.status(401).json({message:"Already a Member"})
        return 
      }
      const group_id = await Group.findOne({access_code})
      if(group_id){

          
   const newMember = {
  member_id: user,
  name: userSession.username,
};

const filter = {
  access_code : access_code, 
};

const update = {
  $push: {
    members: newMember,
  },
};      
    const result = await GroupMembers.updateOne(filter, update);
    return  res.status(200).json({message:"Joined Group"})
      }else{
        return res.status(401).json({message:"Group does not Exist"})
      }
  
  })


  router.post("/leaveGroup",async(req,res)=>{

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

      const {group_id} = req.body
      const user = userSession.user_id
      const joined = await GroupMembers.findOne({group_id:group_id,'members':{
        $elemMatch:{
          'name':userSession.username
        }
      }})

      if(!joined){
        res.status(401).json({message:"Not a Member"})
        return 
      }



const filter = { group_id: group_id };
const pullCondition = { member_id:userSession.user_id };

const update = {
  $pull: { members: pullCondition }
};

const result = await GroupMembers.updateOne(filter, update);
return  res.status(200).json({message:"Exited Group"})

})




  router.get("/mygroups",async(req,res)=>{
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
      const user = userSession.user_id
      const groups = await Group.find({creator_id:user})
  if(groups.length == 0){
    return res.status(401).json({message:"No groups"})
  }
  return res.status(401).json({message:groups})


  })


  router.delete("/deleteGroup",async(req,res)=>{
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
      const {group_id} = req.body
      const group = await Group.findOne({_id:group_id})
      if(group){
        const user = userSession.user_id
        const admin = await Group.findOne({_id:group_id,creator_id:user})
        if(admin){
          await Group.findByIdAndDelete({_id:group_id})
          await GroupMembers.findOneAndDelete({group_id:group_id})
          return res.status(200).json({message:"Group Deleted Successfully"})
        }else{
          return res.status(401).json({message:"User is not Admin"})
        }
      }else{
        return res.status(401).json({message:"Group does not Exist"})
      }
  })


  
  



module.exports = router