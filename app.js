const express = require("express")
const userAuth = require("./routes/UserAuth");
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
app.use(bodyparser.urlencoded({extended:true}))
app.use("/auth",userAuth)

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

