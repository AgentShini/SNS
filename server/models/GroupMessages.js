const mongoose = require("mongoose")
const Schema = mongoose.Schema
const GroupMessageSchema = new Schema({

sender_username:{type:String,required:true},
message:{type:String,required:true},
roomID:{type:mongoose.Schema.Types.Mixed,required:true},
date_sent:{type:Date,default:Date.now()},
date_read:{type:Date,default:Date.now()}

})
const GroupMessages = mongoose.model("GroupMessages",GroupMessageSchema)
module.exports = GroupMessages