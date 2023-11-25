import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import io from 'socket.io-client'; 
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import InactiveChat from './Pages/InactiveChat'
import CreateGroup from './Pages/CreateGroup'
import CreateEvent from './Pages/CreateEvent'
import AllGroups from './Pages/AllGroups'
import AllEvents from './Pages/AllEvents'
import Chat from "./Pages/Chat"
import EventChat from "./Pages/EventChat"
import GroupChat from './Pages/GroupChat'
require("dotenv").config()
const SERVER = process.env.SERVER

const socketIO = io.connect(`${SERVER}`)

export  { socketIO };



function App() {

  return (
    <>
    <Router>
    <Routes>
    <Route path='/inactivechat' element = {<InactiveChat/>}/>
 


    <Route path='/Chat' element = {<Chat/>}/>
    <Route path='/EventChat' element = {<EventChat/>}/>
    <Route path='/GroupChat' element = {<GroupChat/>}/>


    <Route path='/Groups' element = {<AllGroups/>}/>
    <Route path='/Events' element = {<AllEvents/>}/>
    <Route path='/' element = {<Home/>}/>
    <Route path='/createGroup' element = {<CreateGroup/>}/>
    <Route path='/createEvent' element = {<CreateEvent/>}/>



      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
  
    </Routes>
    </Router>
    </>


  )
}

export default App
