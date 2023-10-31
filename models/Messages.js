const mongoose = require("mongoose")
const User = require("./User")
const Schema = mongoose.Schema
const MessageSchema = new Schema({

sender_id:{type:mongoose.Schema.Types.ObjectId,ref:User},
reciever_id:{type:mongoose.Schema.Types.ObjectId,ref:User},
message:{type:String,required:true},
date_sent:{type:Date,default:Date.now()},
date_read:{type:Date,default:Date.now()}

})
const Messages = mongoose.model("Messages",MessageSchema)
module.exports = Messages