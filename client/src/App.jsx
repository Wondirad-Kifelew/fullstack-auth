import React from 'react'
import Auth from './Auth/Auth'
import { Route, Routes } from 'react-router-dom'
import ResetPassword from './Auth/ResetPassword'

function App() {
  return (
    <>
    <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<Auth />} />
    </Routes>
    </>
  )
}

export default App
