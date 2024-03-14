import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { LoginSignUpWrapper } from './components/LoginSignUp/LoginSignUpWrapper'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          index
          element={<LoginSignUpWrapper></LoginSignUpWrapper>}
        />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
      </Routes>
    </Router>
  )
}

export default App
