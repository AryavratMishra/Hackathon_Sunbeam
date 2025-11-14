import React, { useState } from 'react'
import api from '../api/api'

export default function Login({ onLogin }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await api.post('/auth/login', { email, password })
      const { token, user } = res.data
      onLogin({ token, user })
      // redirect
      window.location.href = '/movies'
    }catch(err){
      alert(err?.response?.data?.msg || 'Login failed')
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420,margin:'0 auto'}}>
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="button primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
