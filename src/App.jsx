import MovieList from "./MovieList/MovieList.jsx";
import './App.css'

const App = () => {
  return (
    <>
      <header>
        <h1>Movies</h1>
      </header>
      <div className="App">
        <MovieList />
      </div>
    </>
  );
}

export default App;
