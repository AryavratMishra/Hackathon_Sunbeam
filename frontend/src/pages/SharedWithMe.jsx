import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function SharedWithMe(){
  const [shares, setShares] = useState([])
  useEffect(()=>{
    api.get('/shares/received').then(r=> setShares(r.data)).catch(()=>{})
  },[])

  return (
    <div className="container">
      <h2>Shared With Me</h2>
      {shares.length===0 && <div className="card small">No reviews shared with you</div>}
      {shares.map(s=> (
        <div key={s.id} className="card" style={{marginBottom:8}}>
          <strong>{s.Review?.title}</strong>
          <div className="small">By: {s.Review?.User?.username} — Movie: {s.Review?.Movie?.title}</div>
          <p>{s.Review?.content}</p>
        </div>
      ))}
    </div>
  )
}