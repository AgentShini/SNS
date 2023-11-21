const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Groups = require("./Groups")
const Users = require("./Users")


const GroupMembersSchema = new Schema({

group_id:{type:mongoose.Schema.Types.ObjectId,ref:Groups,required:true},
access_code:{type:String},
name:{type:String},
creator_name:{type:String},
members:[Users]
})
const GroupMembers = mongoose.model("GroupMembers",GroupMembersSchema)
module.exports = GroupMembers