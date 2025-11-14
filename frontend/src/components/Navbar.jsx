import React from 'react';
import { Link } from 'react-router-dom';
import Button from "./Button";

export default function Navbar({ user, onLogout }) {
  return (
    <div className="navbar">
      <div className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>

        {/* LEFT SIDE */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          
          {/* Logo + Reel Image */}
          <Link to="/movies" style={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 700,
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            
            <img 
              src="/movie-reel.png" 
              alt="Movie Reel" 
              style={{ height: '100px', width: '200px'}
            } 
            />
          </Link>

          <Link to="/movies" className="medium" style={{ color: "white" }}>All Movies</Link>
          <Link to="/my-reviews" className="medium" style={{ color: "white" }}>My Reviews</Link>
          <Link to="/shared" className="medium" style={{ color: "white" }}>Shared With Me</Link>
          <Link to="/all-reviews" className="medium" style={{ color: "white" }} >All Reviews</Link>

        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          
          {user ? (
            <>
              <span className="small" style={{ color: "white" }}>Hi, {user.username}</span>

              <Link to="/edit-profile">
                <button className="button outline">Edit Profile</button>
              </Link>

              <Link to="/change-password">
                <button className="button outline">Change Password</button>
              </Link>

              <button className="button" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="button">Login</button>
              </Link>

              <Link to="/register">
                <button className="button outline">Register</button>
              </Link>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
