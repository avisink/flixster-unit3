import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard.jsx";
import axios from "axios";
import "../App.css";
import "../MovieList/MovieList.css";


// hook
function MovieList({ page, searchQuery, sortBy, onMovieClick }) {
    const [movies, setMovies] = useState([]);

    // function to fetch movies - another hook
    useEffect (() => {
        async function fetchMovies() {
            const apiKey = import.meta.env.VITE_API_KEY;      
            try {
                let url;
                if (searchQuery.trim()) {
                  url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}&page=${page}`;
                } else {
                  url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
                }
                const response = await axios.get(url);
                let results=response.data.results;

                results = sortMovies(results, sortBy);

                if (page === 1) {
                  setMovies(results); 
                } else {
                  setMovies((prevMovies) => {
                    const combined = [...prevMovies, ...results];
                    return sortMovies(combined, sortBy);
                  });
                }
            } catch (err) {
                console.error("Error fetching movie list: ", err);
            }          
        }
        fetchMovies();

    }, [page, searchQuery, sortBy]);

    useEffect(() => {
      if (page!== 1) {//i receive an error when this is empty, bc empty if doesnt make sense but idk
      }
    }, [page, searchQuery, sortBy]);

    
    const sortMovies = (movieArray, sortOption) => 
      {const sorted = [...movieArray];

      switch (sortOption) {
        case "title":
          return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case "release_date":
          return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        case "vote_average":
          return sorted.sort((a, b) => b.vote_average - a.vote_average);
        case "popularity":
        default:
          return sorted.sort((a, b) => b.popularity - a.popularity);
      }
    };

    
  return (
    <>
      {movies.length === 0 && searchQuery ? (
        <div className="no-results">
          <p>No movies were found while searching for  `{searchQuery}``. Try searching for something different.</p>
        </div>
      ) : (
          movies.map((movie) => (
          <MovieCard 
          key= {movie.id}
          movie={movie}
          onClick={() => onMovieClick(movie)}
          />
      ))
      )}  
        
    </>
  );
}

MovieList.propTypes = {
  page: PropTypes.number.isRequired,
  searchQuery: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;