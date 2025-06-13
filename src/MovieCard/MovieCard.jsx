import "../MovieCard/MovieCard.css";
import "/Users/aisinkaye/codepath/flixster-unit3/src/App.css";
import PropTypes from "prop-types";

function MovieCard({ movie }) {
    return (
      <div>
        <div className="movie-card">
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`}
          />
          <p>{movie.title}</p>
          <p>Movie Rating: {movie.vote_average}</p>
        </div>
      </div>
    );
}


MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        poster_path: PropTypes.string.isRequired,
    }).isRequired
}

export default MovieCard;