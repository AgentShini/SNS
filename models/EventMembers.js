const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Event = require("./Event")
const Users = require("./Users")

const EventMembersSchema = new Schema({

event_id:{type:mongoose.Schema.Types.ObjectId,ref:Event,required:true},
access_code:{type:String},
members:[Users]
})

const EventMembers = mongoose.model("EventMembers",EventMembersSchema)
module.exports = EventMembers