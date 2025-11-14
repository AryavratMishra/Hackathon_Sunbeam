import React from 'react'
import { Link } from 'react-router-dom'
      import Button from "./Button";


export default function Navbar({ user, onLogout }){
  return (
    <div className="navbar" style={{color : '#F84464'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',color:'#111' }}>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <Link to="/movies" style={{textDecoration:'none',color:'#111',fontWeight:700}}>MovieReviews</Link>
          <Link to="/movies" className="medium">Browse</Link>
          <Link to="/my-reviews" className="medium">My Reviews</Link>
          <Link to="/shared" className="medium">Shared With Me</Link>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {user ? (
            <>
              <span className="small">Hi, {user.username}</span>
              <button className="button" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
        

<Link to="/login"><Button>Login</Button></Link>
<Link to="/register"><Button variant="outline">Register</Button></Link>


            </>
          )}
        </div>
      </div>
    </div>
  )
}