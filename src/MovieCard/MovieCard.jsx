import { useState } from "react";
import "../MovieCard/MovieCard.css";
import PropTypes from "prop-types";

function MovieCard({ movie, onClick }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : null;
  const [liked, setLiked] = useState(false);

  const handleHeartClick =(e) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }
 
  return (
    <div>
      <div className="movie-card" onClick={onClick}>
        {imageUrl ? (
          <img src={imageUrl} alt={`${movie.title} poster`} />
        ) : (
          <div className="img-placeholder">No Image</div>
        )}
        <p>{movie.title}</p>
        <p>Movie Rating: {movie.vote_average.toFixed(1)}</p>
        <span className="heart-icon" role="button" aria-label="like" onClick={handleHeartClick}>
          {liked ? "💚":"🤍"}
        </span>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieCard;