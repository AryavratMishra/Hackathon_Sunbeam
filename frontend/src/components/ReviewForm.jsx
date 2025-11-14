import React, { useState } from 'react'

export default function ReviewForm({ initial = {}, onSubmit }){
  const [title, setTitle] = useState(initial.title || '')
  const [content, setContent] = useState(initial.content || '')
  const [rating, setRating] = useState(initial.rating || 5)

  const submit = (e)=>{
    e.preventDefault()
    if(!title) return alert('Title required')
    if(rating < 1 || rating > 10) return alert('Rating 1-10')
    onSubmit({ title, content, rating })
  }

  return (
    <form onSubmit={submit} className="card">
      <div className="form-row">
        <label>Title</label>
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Content</label>
        <textarea className="input" rows={4} value={content} onChange={e=>setContent(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Rating (1-5)</label>
        <input type="number" min={1} max={5} className="input" value={rating} onChange={e=>setRating(Number(e.target.value))} />
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="button primary" type="submit">Save </button>
      </div>
    </form>
  )
}