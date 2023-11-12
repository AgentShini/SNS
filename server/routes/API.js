const express = require("express")
const router = express.Router()
const User = require("../models/User")

router.get("/usernames",async(req,res)=>{
    const users = await User.find({},'username')
    res.json(users.map(user => user.username));
})
module.exports = router