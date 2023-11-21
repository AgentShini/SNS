const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const Auth = require("./routes/Auth");
const Events = require("./routes/Events")
const Groups = require("./routes/Groups");
const Message = require("./routes/Message");
const Profile = require("./routes/Profile");
const API = require("./routes/API");

const mongoose = require("mongoose")
const bodyparser = require("body-parser")
require("dotenv").config()
const app = express();
const port = 5000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

let chatRoom = '';
let allUsers = [];



const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // Enable credentials (cookies, etc.)
};

app.use(cors(corsOptions));


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // We can write our socket event listeners in here...


  socket.on('join_room', (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room
    //console.log("User started a chat")
   // console.log("Data is",data)

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });


  socket.on('join_group', (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room
    //console.log("User started a chat")
   // console.log("Data is",data)

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('groupchatroom_users', chatRoomUsers);
    socket.emit('groupchatroom_users', chatRoomUsers);
  });



  socket.on('send_message', (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit('receive_message', data); // Send to all users in room, including sender
    console.log("Message is",data)
  });

  
  
});




mongoose.connect(process.env.URI)
mongoose.connection.on('connected',(err)=>{
if(err){
  console.log(err)
}console.log("Connected to server")
})


app.use(bodyparser.json())
app.use(cookieParser())
app.use(bodyparser.urlencoded({extended:true}))

app.use("/chat",Auth,Groups,Message,Profile,Events,API)



server.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

module.exports = {app}