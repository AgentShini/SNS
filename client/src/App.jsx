import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './helpers'
import Cover from './components/Cover'
import Main from './Pages/Profile'
import SimpleBar from 'simplebar-react'
import InactiveChat from './Pages/InactiveChat'
import CreateGroup from './Pages/CreateGroup'
import CreateEvent from './Pages/CreateEvent'
// import JoinGroup from './Pages/JoinGroup'
// import JoinEvent from './Pages/JoinEvent'
import AllGroups from './Pages/AllGroups'
import AllEvents from './Pages/AllEvents'
import Chat from "./Pages/Chat"
import EventChat from "./Pages/EventChat"
import GroupChat from './Pages/GroupChat'






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
    {/* <Route path='/joinEvent' element = {<JoinEvent/>}/>
    <Route path='/joinGroup' element = {<JoinGroup/>}/> */}
    <Route path='/' element = {<Home/>}/>
    <Route path='/createGroup' element = {<CreateGroup/>}/>
    <Route path='/createEvent' element = {<CreateEvent/>}/>



      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/profile' element = {
        <SimpleBar style={{Height: '100vh' }}>
        <ChakraProvider theme={theme}>
                <Cover />
                <Main />
        </ChakraProvider>
        </SimpleBar>
      }/>
    </Routes>
    </Router>
    </>


  )
}

export default App
