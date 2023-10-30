const mongoose = require("mongoose")
const User = require("./User")
const Schema = mongoose.Schema
const EventSchema = new Schema({

name:{type:String,required:true},
description:{type:String,required:true},
creator_id:{type:mongoose.Schema.Types.ObjectId,ref:User},
start_date:{type:Date,required:true},
end_date:{type:Date,required:true},
creation_date:{type:Date,default:Date.now()}
})

const Event = mongoose.model("Events",EventSchema)
module.exports = Event