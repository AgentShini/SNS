const mongoose = require("mongoose")
const Schema = mongoose.Schema
const EventMessageSchema = new Schema({

sender_username:{type:String,required:true},
message:{type:String,required:true},
roomID:{type:mongoose.Schema.Types.Mixed,required:true},
date_sent:{type:Date,default:Date.now()},
date_read:{type:Date,default:Date.now()}

})
const EventMessages = mongoose.model("EventMessages",EventMessageSchema)
module.exports = EventMessages