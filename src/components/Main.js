import React, { useState, useEffect } from 'react'

import MovieLists from './MovieLists'
import MovieListHeading from './MovieListHeading'
import SearchBox from './SearchBox'
import AddFavourite from './AddFavourite'
import RemoveFavourite from './RemoveFavourite'

function Main() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [popularMovies, setPopularMovies] = useState([])
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites'),
    )
    setFavourites(movieFavourites)
  }, [])

  useEffect(() => {
    getPopularMovieRequest()
  }, [])

  const getMovieRequest = async (searchValue) => {
    if (searchValue === '') {
      setMovies([])
    } else {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=31370bdd8fc99a1a12ee8a8da8cae936&language=en-US&query=${searchValue}&page=1&include_adult=false`
      const response = await fetch(url)

      const responseJson = await response.json()

      if (responseJson.results) {
        setMovies(responseJson.results)
      }
    }
  }

  const getPopularMovieRequest = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=31370bdd8fc99a1a12ee8a8da8cae936&language=en-US&page=1`
    const response = await fetch(url)

    const responseJson = await response.json()

    setPopularMovies(responseJson.results)
  }

  const addFavouriteMovie = (movie) => {
    if (favourites.includes(movie)) {
      alert('Already Favourited')
    } else {
      const newFavouriteList = [...favourites, movie]
      setFavourites(newFavouriteList)
      saveToLocalStorage(newFavouriteList)
    }
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((f) => f.id !== movie.id)
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  const saveToLocalStorage = (movie) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(movie))
  }

  return (
    <div className="container-fluid movie-app">
      {/* Heading */}
      <div className="row d-flex align-items-center mt-2 mb-2">
        <MovieListHeading heading="nFlix" size="50px" color="#DB222A" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      {searchValue !== '' && (
        <div className="row">
          <MovieListHeading heading="search Results" />
        </div>
      )}

      <div className="row">
        <MovieLists
          movies={movies}
          handleFavouriteClicked={addFavouriteMovie}
          favouriteComponent={AddFavourite}
        />
      </div>

      {/* Popular_movie */}
      <div className="row d-flex align-items-center mt-2">
        <MovieListHeading heading="Popular Moives" />
      </div>
      <div className="row">
        <MovieLists
          movies={popularMovies}
          handleFavouriteClicked={addFavouriteMovie}
          favouriteComponent={AddFavourite}
        />
      </div>

      {/* Favourite_movies */}
      <div className="row d-flex align-items-center mt-2">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieLists
          movies={favourites}
          handleFavouriteClicked={removeFavouriteMovie}
          favouriteComponent={RemoveFavourite}
        />
      </div>
    </div>
  )
}

export default Main
