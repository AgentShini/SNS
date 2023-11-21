const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Event = require("./Event")
const Users = require("./Users")

const EventMembersSchema = new Schema({

event_id:{type:mongoose.Schema.Types.ObjectId,ref:Event,required:true},
access_code:{type:String},
name:{type:String},
creator_name:{type:String},
creation_date:{type:Date},
start_date:{type:Date},
end_date:{type:Date},
members:[Users]
})

const EventMembers = mongoose.model("EventMembers",EventMembersSchema)
module.exports = EventMembers