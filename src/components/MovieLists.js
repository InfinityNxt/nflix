import React from 'react'
import { Link } from 'react-router-dom'

function MovieLists({ movies, favouriteComponent, handleFavouriteClicked }) {
  const FavouriteComponent = favouriteComponent
  return (
    <>
      {movies.map((movie) => (
        <div
          className="image-container d-flex justify-content-start ml-3 mt-3 mb-3"
          key={movie.id}
        >
          <Link to={`/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              width="200px"
            />
          </Link>
          <div
            onClick={() => handleFavouriteClicked(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  )
}

export default MovieLists
