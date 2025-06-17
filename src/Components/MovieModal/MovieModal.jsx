import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [youtubeKey, setYoutubeKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetails() {
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`;
        const response = await axios.get(url);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie details: ", err);
        setLoading(false);
      }
    }
    
    fetchMovieDetails();
  }, [movie.id]);

  useEffect(()=> {
    async function fetchMovieTrailer() {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!movie?.id) return;
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`;
        const response = await axios.get(url);
        const data = await response.data;
        const trailer = data.results.find(
            vid => vid.site === "YouTube" && vid.type === "Trailer"
        );

        if (trailer) setYoutubeKey(trailer.key);
        else setYoutubeKey(null);
    }
    fetchMovieTrailer();
  }, [movie]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = ((e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; 

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  if (loading) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content">
          <div className="modal-loading">Loading...</div>
        </div>
      </div>
    );
  }

const formatRuntime = (minutes) => {
    return `${minutes}m`;
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          {movieDetails?.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`}
              alt={`${movieDetails.title} backdrop`}
              className="modal-backdrop-image"
            />
          )}
          <div className="modal-header-content">
            <h2>{movieDetails?.title}</h2>
            <div className="modal-rating">
              ⭐ {movieDetails?.vote_average.toFixed(1)}/10
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-info">
            <div className="modal-info-item">
              <strong>Runtime:</strong>{" "}
              {movieDetails?.runtime
                ? formatRuntime(movieDetails.runtime)
                : "N/A"}
            </div>
            <div className="modal-info-item">
              <strong>Release Date:</strong>{" "}
              {movieDetails?.release_date
                ? formatDate(movieDetails.release_date)
                : "N/A"}
            </div>
            <div className="modal-info-item">
              <strong>Genres:</strong>{" "}
              {movieDetails?.genres?.map((genre) => genre.name).join(", ") ||
                "N/A"}
            </div>
          </div>

          <div className="modal-overview">
            <h3>Overview</h3>
            <p>{movieDetails?.overview || "No overview available."}</p>
          </div>

          <div className="movie-trailer">
            {youtubeKey ? (
              <div>
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeKey}`}
                  title="Movie trailer"
                ></iframe>
                <br></br>
              </div>
            ) : (
              <div className="trailerText">No trailer available ☹️</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

MovieModal.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieModal;
