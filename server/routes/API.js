const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Group = require("../models/Groups")
const Event = require("../models/Event")

router.get("/usernames",async(req,res)=>{
    const users = await User.find({})
    return res.json(users);
    
})

router.get("/groups",async(req,res)=>{
    const groups = await Groups.find({})
    return res.json(groups)
})

router.get("/events",async(req,res)=>{
    const events = await Event.find({})
    return res.json(events)
})
module.exports = router