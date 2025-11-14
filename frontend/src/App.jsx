import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import MyReviews from './pages/MyReviews'
import SharedWithMe from './pages/SharedWithMe'
import Navbar from './components/Navbar'
import { getToken, setTokenLocal, clearAuth } from './utils/auth'
import api, { setToken } from './api/api'

export default function App(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const t = getToken()
    if(t){
      setToken(t)
      // optionally fetch user profile
      api.get('/auth/me').then(r=> setUser(r.data.user)).catch(()=>{
        // ignore
      })
    }
  }, [])

  const onLogin = ({ token, user })=>{
    setTokenLocal(token)
    setToken(token)
    setUser(user)
  }

  const logout = ()=>{
    clearAuth()
    setToken(null)
    setUser(null)
  }

  

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={logout} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Register onLogin={onLogin} />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail user={user} />} />
          <Route path="/my-reviews" element={<MyReviews user={user} />} />
          <Route path="/shared" element={<SharedWithMe user={user} />} />
        </Routes>
      </main>
    </div>
  )
}