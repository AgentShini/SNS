import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ActiveChat from './Pages/ActiveChat'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './helpers'
import Cover from './components/Cover'
import Main from './Pages/Profile'
import SimpleBar from 'simplebar-react'
import InactiveChat from './Pages/InactiveChat'


function App() {

  return (
    <>
    <Router>
    <Routes>
    <Route path='/inactivechat' element = {<InactiveChat/>}/>
    <Route path='/activechat' element = {<ActiveChat/>}/>

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
