import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard({ movie }){
  return (
    <div className="card">
      <h3 className="movie-title">{movie.title} <span style={{fontWeight:400,fontSize:12}}>({movie.year})</span></h3>
      <p className="small">{movie.description}</p>
      <div style={{marginTop:8}}>
        <Link to={`/movies/${movie.id}`} className="button primary">View</Link>
      </div>
    </div>
  )
}