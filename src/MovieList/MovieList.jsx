import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard.jsx";
import axios from "axios";
import "../App.css";
import "../MovieList/MovieList.css";


// hook
function MovieList({ page }) {
    const [movies, setMovies] = useState([]);

    // function to fetch movies - another hook
    useEffect (() => {
        async function fetchMovies() {
            const apiKey = import.meta.env.VITE_API_KEY;      
            try {
                const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
                const response = await axios.get(url);
                if (page === 1) {
                  setMovies(response.data.results); 
                } else {
                  setMovies((prevMovies) => [
                    ...prevMovies,
                    ...response.data.results,
                  ]);
                }
            } catch (err) {
                console.error("Error fetching movie list: ", err);
            }          
        }
        fetchMovies();

    }, [page]);
    
  return (
    <>  
        {movies.map((movie) => (
            <MovieCard 
            key= {movie.id}
            movie={movie}
            />
        ))}
    </>
  );
}

MovieList.propTypes = {
  page: PropTypes.number.isRequired,
};

export default MovieList;