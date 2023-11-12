import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../styles/index.css'
import { DataContextProvider } from './Context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <DataContextProvider>
    <App />
    </DataContextProvider>
  </React.StrictMode>,
)
