import { useState } from "react";
import MovieList from "./MovieList/MovieList.jsx";
import Header from "./Header/Header.jsx";
import "./App.css"


import './App.css'

const App = () => {
  const [page, setPage] = useState(1);
  const handleMore = () => setPage(prev => prev +1);

  return (
    <>
      <Header />
      <div className="movie-card-container">
        <MovieList page={page}/>
      </div>
      <div className="center">
        <button id="moreBtn" onClick={handleMore}>More</button>
      </div>
      <footer>Flixster by Ayo 2025</footer>
    </>
  );
}

export default App;
