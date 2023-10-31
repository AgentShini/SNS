const express = require("express")
const uuid = require('uuid')
const User = require("../models/User")
const bcrypt = require("bcrypt")
const router = express.Router();


class Session {
  constructor(username, expiresAt) {
      this.username = username
      this.expiresAt = expiresAt
  }

  isExpired() {
      this.expiresAt < (new Date())
  }
}


const sessions = {}


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
        
        const sessionToken = uuid.v4()
              // set the expiry time as 120s after the current time
        const now = new Date()
        const expiresAt = new Date(+now + 1200 * 1000)

        // create a session containing information about the user and expiry time
        const session = new Session(username, expiresAt)

        sessions[sessionToken] = session

        // In the response, set a cookie on the client with the name "session_cookie"
        // and the value as the UUID we generated. We also set the expiry time
        res.cookie("session_token", sessionToken, { expires: expiresAt })

      let user = new User({
        email:email,
        password:password,
        username:username
      });
 
      // Save user to database
      user.save().then(() => {
        res.json({ message: "User created successfully", user });
      });
    }catch(error){
        return res.status(401).send(error.message);
    }
 

})

router.get("/access",(req,res)=>{

      // if this request doesn't have any cookies, that means it isn't
    // authenticated. Return an error code.
    if (!req.cookies) {
      res.status(401).end()
      return
  }

  // We can obtain the session token from the requests cookies, which come with every request
  const sessionToken = req.cookies['session_token']
  if (!sessionToken) {
      // If the cookie is not set, return an unauthorized status
      res.status(401).end()
      return
  }

   // We then get the session of the user from our session map
    // that we set in the signinHandler
    userSession = sessions[sessionToken]
    if (!userSession) {
        // If the session token is not present in session map, return an unauthorized error
        res.status(401).end()
        return
    }
    // if the session has expired, return an unauthorized error, and delete the 
    // session from our map
    if (userSession.isExpired()) {
        delete sessions[sessionToken]
        res.status(401).end()
        return
    }

    // If all checks have passed, we can consider the user authenticated and
    // send a welcome message
    res.send(`Welcome  ${userSession.username}!`).end()
  res.status(200).json({message:"AUTH"})
})


router.post("/logout",(req,res)=>{
  if (!req.cookies) {
    res.status(401).end()
    return
}

const sessionToken = req.cookies['session_token']
if (!sessionToken) {
    res.status(401).end()
    return
}

delete sessions[sessionToken]

res.cookie("session_token", "", { expires: new Date() })
res.end()
})



router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
   
      let user = await User.findOne({ email });
   
      if (!user) {
        return res.status(401).json({ message: "Email does not exist" });
      }
   
      bcrypt.compare(password, user.password, (err, result) => {
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