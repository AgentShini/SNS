const express = require("express")
const uuid = require('uuid')
 const { Session,sessions} = require("./Sessions")
 const User = require("../models/User")
 const router = express.Router();
 const bcrypt = require("bcrypt")




router.post("/register",async(req,res)=>{
    const sessionToken = req.cookies['session_token']
    if (req.cookies && sessionToken) {
      userSession = sessions[sessionToken]
      if (userSession) {
        // If the session token is not present in session map, return an unauthorized error
        res.status(401).json({message:"Active Session"})
        return
    }
  }
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
          
          const sessionToken = uuid.v4()
    // set the expiry time as 120s after the current time
  const now = new Date()
  const expiresAt = new Date(+now + 120000 * 1000000)
  
  
  
  
        let user = new User({
          email:email,
          password:password,
          username:username
        });
   
        // Save user to database
        user.save().then(() => {
          res.json({ message: "User created successfully", user });
        });
  
  
     // create a session containing information about the user and expiry time
    const session = new Session(username, expiresAt, user._id);
    sessions[sessionToken] = session
    
    // In the response, set a cookie on the client with the name "session_cookie"
    // and the value as the UUID we generated. We also set the expiry time
    res.cookie('session_token', sessionToken, {
      expires: expiresAt,
      domain: 'localhost', // or 'localhost'
      path: '/', // Set to the path where the cookie should be accessible
      secure: false, // Set to true if you use HTTPS in development
      httpOnly: true, // Recommended for security, prevents client-side access
      sameSite:'Strict',
    }); 
    
      }catch(error){
          return res.status(401).send(error.message);
      }
  
  })





router.get("/access",(req,res)=>{
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
  
      // If all checks have passed, we can consider the user authenticated and
      // send a welcome message
      res.status(200).send(`Welcome  ${userSession.username}!`).end()
  })
  
  
  
  
  router.post("/logout",(req,res)=>{
    if (!req.cookies) {
      res.status(401).json({message:"Unauthorized"})
      return
  }
  
  const sessionToken = req.cookies['session_token']
  if (!sessionToken) {
    res.status(401).json({message:"Unauthorized"})
    return
  }
  
  delete sessions[sessionToken]
  

  return res.cookie('session_token', "", {
    expires: new Date(),
    domain: 'localhost', // or 'localhost'
    path: '/', // Set to the path where the cookie should be accessible
    secure: false, // Set to true if you use HTTPS in development
    httpOnly: true, // Recommended for security, prevents client-side access
    sameSite:'Strict',
  }).json({message:"Logged out"});  
  
  })
  
  
  
  router.post("/login", async (req, res) => {
  
    const sessionToken = req.cookies['session_token']
    if (req.cookies && sessionToken) {
      userSession = sessions[sessionToken]
      if (userSession) {
        // If the session token is not present in session map, return an unauthorized error
        res.status(401).json({message:"Active Session"})
        return
    }
  
  }
      try {
        const { username, password } = req.body;
     
        let user = await User.findOne({ username });
     
        if (!user) {
          return res.status(401).json({ message: "User does not exist" });
        }
     
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            
            const sessionToken = uuid.v4()
            // set the expiry time as 120s after the current time
          const now = new Date()
          const expiresAt = new Date(+now + 1200000 * 100000000)
          
          // create a session containing information about the user and expiry time
          const session = new Session(username, expiresAt,user._id)
          
          sessions[sessionToken] = session
          
          // In the response, set a cookie on the client with the name "session_cookie"
          // and the value as the UUID we generated. We also set the expiry time
          res.cookie('session_token', sessionToken, {
            expires: expiresAt,
            domain: 'localhost', // or 'localhost'
            path: '/', // Set to the path where the cookie should be accessible
            secure: false, // Set to true if you use HTTPS in development
            httpOnly: true, // Recommended for security, prevents client-side access
            sameSite:'Strict',
          });            return res.status(200).json({ message: "User Logged in Successfully" });
          }
          
          console.log(err);
          return res.status(401).json({ message: "Invalid Credentials" });
        });
      } catch (error) {
        return res.status(401).send(err.message);
      }
    });


 module.exports = router