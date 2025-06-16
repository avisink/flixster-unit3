import "../MovieCard/MovieCard.css";
import PropTypes from "prop-types";

function MovieCard({ movie, onClick }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : null;

  return (
    <div>
      <div className="movie-card" onClick={onClick}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${movie.title} poster`}
          />
        ) : (
          <div className="img-placeholder">No Image</div>
        )}
        <p>{movie.title}</p>
        <p>Movie Rating: {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieCard;