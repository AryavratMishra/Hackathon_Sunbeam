import React, { useState } from 'react'
import api from '../api/api'
import { setToken as setApiToken } from '../api/api'
import { setTokenLocal } from '../utils/auth'

export default function Register({ onLogin }){
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await api.post('/auth/register', { username, email, password })
      const { token, user } = res.data
      setApiToken(token)
      setTokenLocal(token)
      onLogin({ token, user })
      window.location.href = '/movies'
    }catch(err){
      alert(err?.response?.data?.msg || 'Register failed')
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420,margin:'0 auto'}}>
        <h2>Register</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Username</label>
            <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="button primary" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}