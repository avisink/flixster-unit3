import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard.jsx";
import "../App.css";
import "../MovieList/MovieList.css";


// hook
function MovieList() {
    const [movies, setMovies] = useState([]);

    // fucntion to fetch movies - another hok
    useEffect (() => {
        async function fetchMovies() {
            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`; 
            const response = await fetch(url);
            try {
                const data = await response.json();
                setMovies(data.results);
            } catch (err) {
                console.error("Error fetching movie list: ", err);
            }
            
        }
        fetchMovies();

    }, []);
    
  return (
    <>  
        {movies.map((movie) => (
            <MovieCard 
            key= {movie.id}
            movie={movie}
            title={movie.title}
            vote_average ={movie.vote_average}
            />
        ))}
    </>
  );
}

export default MovieList;