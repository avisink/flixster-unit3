import { useState } from "react";
import PropTypes from "prop-types";
import "./Header.css";

function Header({ onSearch, onSort, searchQuery, sortBy }) {
  const [input, setInput] = useState(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  }

  const handleClear =(e) => {
    e.preventDefault();
    setInput("");
    onSearch(""); 
  }

  const handleSortBy = (e) => {
    onSort(e.target.value);
  }


  const handleEnterClick = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(input);
    }
  };

    return (
      <>
        <header>
          <h1>Movies</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Search: </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleEnterClick}
                  className="search-input"
                  placeholder="Search for movies..."
                ></input>
                <button type="submit" id="submitBtn">
                  Submit
                </button>

                <button type="submit" id="clearBtn" onClick={handleClear}>
                  Clear
                </button>
              </div>

              <div>
                <label>Sort by</label>
                <select
                  name="movies"
                  id="movie-sorting"
                  value={sortBy}
                  onChange={handleSortBy}
                >
                  <option value="popularity">Popularity</option>
                  <option value="title">Title</option>
                  <option value="release_date">Release Date</option>
                </select>
              </div>
            </form>
          </div>
        </header>
      </>
    );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  searchQuery: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
};

export default Header;