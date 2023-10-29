const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const UserSchema = new Schema({

username:{type:String,required:true,unique:true},
email:{type:String,required:true,unique:true},
hash_password:{type:String,required:true,unique:true},
profile_picture:{type:String},
bio:{type:String,default:"Bio"},
date_joined:{type:Date,default:Date.now()},
last_active:{type:Date,default:Date.now()}

})
const User = mongoose.model("Users",UserSchema)
module.exports = User