import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'
import ReviewForm from '../components/ReviewForm'

export default function MovieDetail({ user }){
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [reviews, setReviews] = useState([])

  const load = ()=>{
    api.get(`/movies/${id}`).then(r=> setMovie(r.data)).catch(()=>{})
    api.get(`/movies/${id}/reviews`).then(r=> setReviews(r.data)).catch(()=>{})
  }

  useEffect(()=>{ load() }, [id])

  const addReview = async (payload)=>{
    try{
      await api.post('/reviews', { movieId: Number(id), ...payload })
      load()
    }catch(err){ alert(err?.response?.data?.msg || 'Failed') }
  }

  return (
    <div className="container">
      {movie && (
        <>
          <div className="card">
            <h2>{movie.title} <span style={{fontWeight:400}}>({movie.year})</span></h2>
            <p>{movie.description}</p>
          </div>
          <h3 style={{marginTop:16}}>Reviews</h3>
          <div style={{display:'grid',gap:8}}>
            {reviews.length===0 && <div className="card small">No reviews yet</div>}
            {reviews.map(rv=> (
              <div key={rv.id} className="card">
                <strong>{rv.title}</strong>
                <div className="small">By: {rv.User?.username || rv.userId} — Rating: {rv.rating}</div>
                <p>{rv.content}</p>
              </div>
            ))}
          </div>

          {user ? (
            <div style={{marginTop:16}}>
              <h3>Add your review</h3>
              <ReviewForm onSubmit={addReview} />
            </div>
          ) : (
            <div className="card small">Login to write a review</div>
          )}
        </>
      )}
    </div>
  )
}