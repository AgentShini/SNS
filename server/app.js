const express = require("express")
const cookieParser = require('cookie-parser')
const Auth = require("./routes/Auth");
const Events = require("./routes/Events")
const Groups = require("./routes/Groups");
const Message = require("./routes/Message");
const Profile = require("./routes/Profile");

const mongoose = require("mongoose")
const bodyparser = require("body-parser")
require("dotenv").config()
const app = express();
const port = 5000;
mongoose.connect(process.env.URI)
mongoose.connection.on('connected',(err)=>{
if(err){
  console.log(err)
}console.log("Connected to server")
})

app.use(bodyparser.json())
app.use(cookieParser())
app.use(bodyparser.urlencoded({extended:true}))
app.use("/chat",Auth,Groups,Message,Profile,Events)



app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

module.exports = {app}