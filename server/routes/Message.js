const express = require("express")
const router = express.Router();
const {sessions} = require("./Sessions")
const Messages = require("../models/Messages");
const GroupMessages = require("../models/GroupMessages")
const GroupMembers = require("../models/GroupMembers")

router.post('/message', async (req, res) => {

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
      const {receiver,chat,room} = req.body
    
      const message = new Messages({
        sender_username: userSession.username,
        reciever_username: receiver,
        message: chat,
        roomID:room,
        date_sent: new Date(),
      });
  
      await message.save();
  

  res.send(message);
          
      });


      router.post('/groupmessage', async (req, res) => {

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
          const {chat,groupRoom} = req.body
        
          const message = new GroupMessages({
            sender_username: userSession.username,
            message: chat,
            roomID:groupRoom,
            date_sent: new Date(),
          });
      
          await message.save();
      
    
      res.send(message);
              
          });
    
    
    router.get('/messages', async (req, res) => {
      if (!req.cookies) {
        res.status(401).json({message:"Unauthorized"})
        return
    }
    
    const sessionToken = req.cookies['session_token']
    if (!sessionToken) {
      res.status(401).json({message:"Unauthorized"})
      return
    }
    
       // We then get the session of the user from our session map
        // that we set in the signinHandler
        userSession = sessions[sessionToken]
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
      const userID = userSession.username
      const messages = await Messages.find({sender_username:userID});
      if(messages.length == 0){
        res.status(401).json({message:"No Messages"})
      }
     return res.send(messages);
    });

    router.get('/room_messages', async (req, res) => {
        const {roomID} = req.query
        const messages = await Messages.find({'roomID':roomID});
     return res.send(messages);
    });

    router.get('/group_messages', async (req, res) => {
      const {roomID} = req.query
      const messages = await GroupMessages.find({'roomID':roomID});
   return res.send(messages);
  });


  router.get('/group_member', async (req, res) => {
    const {access_code,username} = req.query
    const joined = await GroupMembers.findOne({access_code:access_code,'members':{
      $elemMatch:{
        'name':username
      }
    }})
    if(joined){
      return res.status(200).json({message:"Is a Member"})
    }else{
      return res.status(201).json({message:"Is not a Member"})
    }
});

  



 
    module.exports = router