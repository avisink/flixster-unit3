import MovieList from "./MovieList/MovieList.jsx";
import Header from "./Header/Header.jsx";


import './App.css'

const App = () => {
  return (
    <>
      <Header />
      <div className="movie-card-container">
        <MovieList />
      </div>
      <div className="center">
        <button id="moreBtn">More</button>
      </div>
      <footer>Flixster by Ayo 2025</footer>
    </>
  );
}

export default App;
