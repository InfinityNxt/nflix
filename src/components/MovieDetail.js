import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

import SimilarMovieList from './SimilarMovieList'

function MovieDetail({ match }) {
  const [movieDetail, setMovieDetail] = useState({})
  const [similarMovieDetail, setSimilarMovieDetail] = useState([])
  const [favourites, setFavourites] = useState([])
  const [aldyFav, setAldyFav] = useState(false)
  const [loading, setLoading] = useState(false)
  const genres = movieDetail.genres

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites'),
    )
    setFavourites(movieFavourites)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      if (favourites !== [] || movieDetail !== {}) {
        const fav = favourites.filter((f) => f.id === movieDetail.id)
        if (fav[0].id) {
          setAldyFav(true)
        } else {
          setAldyFav(false)
        }
      }
    } catch (error) {
    }
  }, [favourites, movieDetail])

  useEffect(() => {
    getDetail()
    getSimilarDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id])

  const getDetail = async () => {
    setLoading(true)
    const url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=31370bdd8fc99a1a12ee8a8da8cae936&language=en-US`
    const response = await fetch(url)

    const responseJson = await response.json()
    setMovieDetail(responseJson)
    setLoading(false)
  }

  const getSimilarDetail = async () => {
    setLoading(true)
    const url = `https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=31370bdd8fc99a1a12ee8a8da8cae936&language=en-US&page=1`
    const response = await fetch(url)

    const responseJson = await response.json()
    setSimilarMovieDetail(responseJson.results)
    setLoading(false)
  }

  const addFavouriteMovie = (movie) => {
    if (favourites.includes(movie)) {
      alert('Already Favourited')
    } else {
      const newFavouriteList = [...favourites, movie]
      setFavourites(newFavouriteList)
      saveToLocalStorage(newFavouriteList)
      setAldyFav(true)
    }
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((f) => f.id !== movie.id)
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
    setAldyFav(false)
  }

  const saveToLocalStorage = (movie) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(movie))
  }

  return (
    <>
      {loading ? (
        <div className="detail-spinner">
          <div className="spinner-border text-secondary " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent">
              <li className="breadcrumb-item">
                <Link to={`/home`}>Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {movieDetail.original_title}
              </li>
            </ol>
          </nav>
          <div className="container-fluid">
            <div className="row">
              <div className="col col-sm-5 col-md-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                  className="img-responsive"
                  alt="..."
                  width="250px"
                />
              </div>
              <div className="col">
                <h3 className="mt-0">{movieDetail.original_title}</h3>

                {genres &&
                  genres.map((g) => (
                    <span key={g.id} className="mr-2 pl-2 pr-2 genre rounded">
                      {g.name}
                    </span>
                  ))}
                <div className="mt-4">
                  <div className="row mt-2 mb-2">
                    <div className="col-3 col-sm-3 ">
                      {'IMDB ' + movieDetail.vote_average + '/10 '}
                    </div>
                    <div className="col">
                      {'- ' + movieDetail.vote_count + ' votes'}
                    </div>
                  </div>
                  <div className="row mt-2 mb-2">
                    <div className="col-3 col-sm-3">Budget</div>
                    <div className="col">{'- $ ' + movieDetail.budget}</div>
                  </div>
                  <div className="row mt-2 mb-2">
                    <div className="col-3 col-sm-3">Duration</div>
                    <div className="col">
                      {'- ' + movieDetail.runtime + ' min'}
                    </div>
                  </div>
                  <div className="row mt-2 mb-2">
                    <div className="col-3 col-sm-3">Release Date</div>
                    <div className="col">{'- ' + movieDetail.release_date}</div>
                  </div>
                  <div className="row mt-2 mb-2">
                    <div className="col-3 col-sm-3">Language</div>
                    <div className="col">
                      {'- ' + movieDetail.original_language}
                    </div>
                  </div>
                  {aldyFav ? (
                    <div>
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => removeFavouriteMovie(movieDetail)}
                      >
                        Remove from Favourites
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={() => addFavouriteMovie(movieDetail)}
                      >
                        Add to Favourites
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h5>Overview</h5>
              <p>{movieDetail.overview}</p>
            </div>
            <h5>Similar Movies</h5>
            <div className="movie-app container-fluid">
              <div className="row">
                <SimilarMovieList movies={similarMovieDetail} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MovieDetail
