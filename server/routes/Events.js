const express = require("express")
const uuid = require('uuid')
const Event = require("../models/Event")
const EventMembers = require("../models/EventMembers")
const {sessions} = require("./Sessions")
const router = express.Router();


router.post("/createEvent",async(req,res)=>{
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
      try{
        const creator_id = userSession.user_id
        const creator_name = userSession.username
        const{name,description,start_date,end_date} = req.body
  
       
        const access_code = uuid.v4();
        const event = new Event({
          name:name,
          description:description,
          creator_id:creator_id,
          creator_name:creator_name,
          access_code:access_code,
          start_date:start_date,
          end_date:end_date
        })
       
         await event.save()
  
         const newMember = new EventMembers({
          event_id:event._id,
          access_code:access_code,
          creator_name:creator_name,
          creation_date:Date.now(),
          start_date:start_date,
          end_date:end_date,
          name:name,
  
          members:{
            member_id:creator_id,
            name:userSession.username
          }})
  
          await newMember.save()
         res.status(200).json({message:event})
      }catch(error){
        if (error) {
          return res.status(400).json({ message:error.message });
        }
      }
      
  })

  router.post("/joinEvent",async(req,res)=>{
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
      const joined = await EventMembers.findOne({access_code:access_code,'members':{
        $elemMatch:{
          'name':userSession.username
        }
      }})

      const event_missed = await Event.findOne({access_code:access_code})

      if(event_missed.end_date < Date.now()){
        res.status(401).json({message:"Event Ended"});
        return
      }

      if(joined){
        res.status(401).json({message:"Already a Member"})
        return 
      }
      const event_id = await Event.findOne({access_code})
      if(event_id){

          
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
    name:event_id.name,
  },
};      
    const result = await EventMembers.updateOne(filter, update);
    return  res.status(200).json({member:result})
      }else{
        return res.status(401).json({message:"Group does not Exist"})
      }
  
  })


  router.post("/leaveEvent",async(req,res)=>{

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

      const {event_id} = req.body
      const joined = await EventMembers.findOne({event_id:event_id,'members':{
        $elemMatch:{
          'name':userSession.username
        }
      }})

      if(!joined){
        res.status(401).json({message:"Not a Member"})
        return 
      }



const filter = { event_id: event_id };
const pullCondition = { member_id:userSession.user_id };

const update = {
  $pull: { members: pullCondition }
};

const result = await EventMembers.updateOne(filter, update);
return  res.status(200).json({member:result})
  })






  router.get("/myEvents",async(req,res)=>{
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
      const events = await Event.find({creator_id:user})
  if(events.length == 0){
    return res.status(401).json({message:"No events"})
  }
  return res.status(401).json({message:events})


  })



  router.get("/EventsIn",async(req,res)=>{    
    const {username} = req.query
      const events = await EventMembers.find({'members':{
        $elemMatch:{
          'name':username
        }
      }})
  if(events.length == 0){
    return res.status(401).json({message:"No events"})
  }
  return res.send(events);


  })




  router.delete("/deleteEvent",async(req,res)=>{
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
      const {event_id} = req.body
      const group = await Event.findOne({_id:event_id})
      if(group){
        const user = userSession.user_id
        const admin = await Event.findOne({_id:event_id,creator_id:user})
        if(admin){
          await Event.findByIdAndDelete({_id:event_id})
          await EventMembers.findOneAndDelete({event_id:event_id})
          return res.status(200).json({message:"Event Deleted Successfully"})
        }else{
          return res.status(401).json({message:"User is not Admin"})
        }
      }else{
        return res.status(401).json({message:"Event does not Exist"})
      }
  })

  
  



module.exports = router