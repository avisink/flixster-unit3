import { useState } from "react";
import MovieList from "./MovieList/MovieList.jsx";
import Header from "./Header/Header.jsx";
import MovieModal from "./MovieModal/MovieModal.jsx"
import "./App.css"


import './App.css'

const App = () => {
  const [page, setPage] = useState(1);
  const handleMore = () => setPage(prev => prev +1);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const [sortBy, setSortBy] = useState("popularity");
  const handleSort = (sortChoice) => {
    setSortBy(sortChoice);
    setPage(1);
  };

  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleSelectedMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }


  

  return (
    <>
      <Header 
        onSearch = {handleSearch}
        onSort = {handleSort}
        searchQuery = {searchQuery}
        sortBy = {sortBy}
      />
      <div className="movie-card-container">
        <MovieList  
          page={page}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onMovieClick = {handleSelectedMovieClick}
          />
      </div>
      <div className="center">
        <button id="moreBtn" onClick={handleMore}>More</button>
      </div>
      <footer>Flixster by Ayo 2025</footer>

      {isModalOpen && selectedMovie && (
        <MovieModal
          movie = {selectedMovie}
          onClose = {handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
