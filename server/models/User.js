const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const { isEmail } = require('validator')
const bcrypt = require("bcrypt")
const UserSchema = new Schema({

username:{type:String,required:true,unique:true},
email:{type:String,required:true,unique:true,
   validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email`
        }},
password:{type:String,required:true},
profile_picture:{type:String,default:"profile"},
bio:{type:String,default:"Bio"},
date_joined:{type:Date,default:Date.now()},
last_active:{type:Date,default:Date.now()}

})

UserSchema.pre('save', async function(next) {
    try {
      const user = this;
      if (!user.isModified('password')) next();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

const User = mongoose.model("Users",UserSchema)
module.exports = User