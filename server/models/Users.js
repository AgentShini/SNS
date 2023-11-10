const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Users = new Schema({
    
    member_id: { type:String,required: true },
    name: { type: String, required: true },
  });

  module.exports = Users