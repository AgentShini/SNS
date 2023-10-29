const mongoose = require("mongoose")
const User = require("./User")
const Post = require("./Post")
const Schema = mongoose.Schema;
const PostSchema = new Schema({

user_id:{type:mongoose.Schema.Types.ObjectId,ref:User},
post_id:{type:mongoose.Schema.Types.ObjectId,ref:User},
content:{type:String,required:true},
date_created:{type:Date,default:Date.now()},
date_updated:{type:Date,default:Date.now()}
})

const Post = mongoose.model("Post",PostSchema)
module.exports = Post