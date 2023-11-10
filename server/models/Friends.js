const mongoose = require('mongoose')
const User = require("./User")
const Schema = mongoose.Schema;
const FriendsSchema = new Schema({

user_id:{type:mongoose.Schema.Types.ObjectId,ref:User},
friend_id:{type:mongoose.Schema.Types.ObjectId,ref:User},
})

const Friends = mongoose.model("Friends",FriendsSchema);
module.exports = Friends