import "./Header.css";

function Header() {
    return (
      <>
        <header>
          <h1>Movies</h1>

          <form>
            <label>Search: </label>
            <input type="text"></input>
            <button type="submit" id="submitBtn">
              Submit
            </button>

            <button type="submit" id="clearBtn">
              Clear
            </button>
            
            <div>
              <label>Sort by</label>
              <select name="movies" id="movie-sorting">
                <option value="popularity">Popularity</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </form>
        </header>
      </>
    );
}

export default Header;