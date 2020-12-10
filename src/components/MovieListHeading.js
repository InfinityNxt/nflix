import React from 'react'

function MovieListHeading({ heading, size = '30px', color = '#bfdbf7' }) {
  return (
    <div className="col">
      <div style={{ fontSize: size, color: color }}>{heading}</div>
    </div>
  )
}

export default MovieListHeading
