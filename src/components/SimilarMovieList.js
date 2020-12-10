import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function SimilarMovieList({ movies }) {
  return (
    <>
      {movies.map((movie) => (
        <div
          className="image-container d-flex justify-content-start mt-3 mr-2 mb-3"
          key={movie.id}
        >
          <Link to={`/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              width="150px"
            />
          </Link>
        </div>
      ))}
    </>
  )
}

export default SimilarMovieList
