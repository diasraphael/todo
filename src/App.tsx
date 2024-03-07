import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginSignUp from './components/LoginSignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<LoginSignUp></LoginSignUp>} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
      </Routes>
    </Router>
  )
}

export default App
