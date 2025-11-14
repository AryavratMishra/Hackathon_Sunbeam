import React, { useEffect, useState } from 'react'
import api from '../api/api'
import MovieCard from '../components/MovieCard'

export default function Movies(){
  const [movies, setMovies] = useState([])
  useEffect(()=>{
    api.get('/movies').then(r=> setMovies(r.data)).catch(()=>{})
  },[])

  return (
    <div className="container">
      <h2>Movies</h2>
      <div className="grid">
        {movies.map(m=> <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  )
}