import React, { useEffect, useState } from 'react'
import api from '../api/api'
import ReviewForm from '../components/ReviewForm'

export default function MyReviews({ user }){
  const [reviews, setReviews] = useState([])
  const [editing, setEditing] = useState(null)
  const [users, setUsers] = useState([]) // for sharing

  const load = ()=>{
    api.get('/reviews/mine').then(r=> setReviews(r.data)).catch(()=>{})
    api.get('/auth/users').then(r=> setUsers(r.data)).catch(()=>{})
  }

  useEffect(()=>{ load() }, [])

  const save = async (id, payload)=>{
    try{
      if(id) await api.put(`/reviews/${id}`, payload)
      else await api.post('/reviews', payload)
      setEditing(null)
      load()
    }catch(err){ alert('Save failed') }
  }

  const del = async (id)=>{
    if(!confirm('Delete review?')) return
    await api.delete(`/reviews/${id}`)
    load()
  }

  const share = async (reviewId, sharedWithUserId)=>{
    try{
      await api.post(`/reviews/${reviewId}/share`, { sharedWithUserId })
      alert('Shared')
    }catch(err){ alert(err?.response?.data?.msg || 'Share failed') }
  }

  return (
    <div className="container">
      <h2>My Reviews</h2>
      {reviews.map(r=> (
        <div key={r.id} className="card" style={{marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <strong>{r.title}</strong>
            <div>
              <button className="button" onClick={()=> setEditing(r)}>Edit</button>
              <button className="button" onClick={()=> del(r.id)}>Delete</button>
            </div>
          </div>
          <div className="small">Movie: {r.Movie?.title || r.movieId} — Rating: {r.rating}</div>
          <p>{r.content}</p>
          <div style={{marginTop:8}}>
            <label className="small">Share with:</label>
            <select onChange={(e)=> share(r.id, Number(e.target.value))} defaultValue="">
              <option value="">-- select user --</option>
              {users.filter(u=> u.id !== r.userId).map(u=> (
                <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
              ))}
            </select>
          </div>
        </div>
      ))}

      {editing && (
        <div style={{marginTop:12}}>
          <h3>Edit Review</h3>
          <ReviewForm initial={editing} onSubmit={(p)=> save(editing.id, p)} />
          <button onClick={()=> setEditing(null)} className="button">Cancel</button>
        </div>
      )}

    </div>
  )
}