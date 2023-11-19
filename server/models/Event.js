const mongoose = require("mongoose")
const User = require("./User")
const Schema = mongoose.Schema
const EventSchema = new Schema({

name:{type:String,required:true},
description:{type:String,required:true},
creator_id:{type:mongoose.Schema.Types.ObjectId,ref:User},
start_date:{type:Date,required:true,  validate: {
    validator: function (value) {
      // Check if the selected start date is not in the past
      return value >= new Date();
    },
    message: 'Start date cannot be a past date.',
  },},
end_date:{type:Date,required:true,  validate: {
    validator: function (value) {
      // Check if the selected start date is not in the past
      return value >= new Date();
    },
    message: 'End date cannot be a past date.',
  },},
creation_date:{type:Date,default:Date.now()},
access_code:{type:String,required:true}

})

const Event = mongoose.model("Events",EventSchema)
module.exports = Event