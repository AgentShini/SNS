const express = require("express")
const router = express.Router();
const {sessions} = require("./Sessions")
const Messages = require("../models/Messages")


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
      const {reciever,chat} = req.body
      const message = new Messages({
        sender_username: userSession.username,
        reciever_username: reciever,
        message: chat,
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
      const userID = userSession.user_id
      const messages = await Messages.find({sender_id:userID});
      if(messages.length == 0){
        res.status(401).json({message:"No Messages"})
      }
     return res.send(messages);
    });
    module.exports = router