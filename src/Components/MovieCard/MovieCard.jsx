import { useState } from "react";
import "./MovieCard.css";
import PropTypes from "prop-types";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

function MovieCard({ movie, onClick }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : null;
  const [liked, setLiked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const handleHeartClick =(e) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }

  const toggleWatched = (e) => {
    e.stopPropagation();
    setIsWatched(!isWatched);
  };
 
  return (
    <div>
      <div className="movie-card" onClick={onClick}>
        {imageUrl ? (
          <img src={imageUrl} alt={`${movie.title} poster`} />
        ) : (
          <div className="img-placeholder">No Image Available</div>
        )}
        <p>{movie.title}</p>
        <p>Movie Rating: {movie.vote_average.toFixed(1)}</p>
        <div className="favorite-watch">
          <span
            className="heart-icon"
            role="button"
            aria-label="like"
            onClick={handleHeartClick}
            data-tooltip-id="favorited-tooltip"
            data-tooltip-content={
              liked ? "Added to favorites!" : "Add to favorites."
            }
          >
            {liked ? (
              <FontAwesomeIcon icon={faBookmarkSolid} />
            ) : (
              <FontAwesomeIcon icon={faBookmarkRegular} />
            )}
          </span>
          <Tooltip id="favorited-tooltip" />

          <span
            data-tooltip-id="watched-tooltip"
            data-tooltip-content={isWatched ? "Watched" : "Mark as watched"}
            onClick={toggleWatched}
          >
            {isWatched ? (
              <FaCheckCircle color="#22c55e" />
            ) : (
              <FaRegCircle color="#64748b" />
            )}
          </span>
          <Tooltip id="watched-tooltip" />
        </div>
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