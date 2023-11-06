const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("./User")

const GroupSchema = new Schema({

name:{type:String,required:true},
description:{type:String,required:true},
creator_id:{type:mongoose.Schema.Types.ObjectId,ref:User},
creation_date:{type:Date,default:Date.now()},
access_code:{type:String,required:true}
})
const Groups = mongoose.model("Groups",GroupSchema)
module.exports = Groups