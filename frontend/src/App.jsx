import React, { useState } from 'react'

import './App.css'
import Header from './components/Header'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AddCategory from './pages/AddCategory'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {


  return (
    <>
      <BrowserRouter>
       <Header />
        <Routes>
          <Route path="/nav" element={<Header />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-category" element={<AddCategory />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
