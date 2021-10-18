import React, { useState } from "react";
/* Axios is a library which is used to make requests to an API and it 
returns data from the API which can be utilised in my react-app. */
import axios from "axios";

/*In order to make my app more efficient & readable, I created a single CSS file 
(App.css) to store the style properties for all my react components. */

// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import ResultList from "./components/ResultList";
import FavouriteList from "./components/FavouriteList";
import MediaListHeading from "./components/MediaListHeading";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  /* --State-- */
  // State for input field.
  const [term, setTerm] = useState("");
  // State object that will hold the results that come back from the search.
  const [results, setResults] = useState([]);
  // State for Dropdown Menu.
  const [media, setMedia] = useState("all");
  // Utilised state in order to hold things as favourites.
  const [favourites, setFavourites] = useState([]);

  //Function to fetch data from iTunes Search API using axios.
  async function getiTunesData() {
    let result = await axios.get(`/api/search/${term}/${media}`);
    // The line below will get the JSON data under results.
    setResults(result.data.results);
  }

  /* Using e.preventDefault will prevent the page from reloading when the 
  Search/Submit button is clicked & thereafter it will call the getiTunesData
  function. */
  const onSubmit = (e) => {
    e.preventDefault();
    getiTunesData();
  };

  /* Since I have specified the Express App as my proxy server in the React App 
  package.json file, I am only required to provide the path when making API requests 
  and NOT the entire URL. */
  const addFavouriteMedia = async (result) => {
    const response = await axios.post("/api/favourites", result);
    const newFavouriteList = [...favourites, result];
    setFavourites(newFavouriteList);
    if (response.status === 200) {
      toast.success("Added to Favourites");
    }
  };

  /*This function will remove the selected item from favourites.
  A confirmation message to remove the item from favourites will pop up.
  Remember, when you use the filter function on an array, it gives you a new
  array which I then set into state. */
  const removeFavouriteMedia = (result) => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from favourites?"
      )
    ) {
      const newFavouriteList = favourites.filter(
        (favourite) => favourite.trackId !== result.trackId
      );
      setFavourites(newFavouriteList);
    }
  };

  return (
    <div className="app">
      <ToastContainer position="top-center" />
      <Container>
        <Row>
          {/* Column 1 - Starts */}
          <Col sm={8} md={8} lg={8}>
            {/* Search Component Starts */}
            <div className="SearchWrapper">
              <h1>iTunes Search</h1>
              <form className="SearchForm" onSubmit={onSubmit}>
                <input
                  type="text"
                  className="Input"
                  placeholder="Enter Search"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
                <input className="Submit" type="submit" value="Search" />
                <select
                  className="Media"
                  onChange={(e) => setMedia(e.currentTarget.value)}
                >
                  <option value="all">All</option>
                  <option value="movie">Movie</option>
                  <option value="podcast">Podcast</option>
                  <option value="music">Music</option>
                  <option value="musicVideo">Music Video</option>
                  <option value="audiobook">Audio Book</option>
                  <option value="shortFilm">Short Film</option>
                  <option value="tvShow">TV Show</option>
                  <option value="software">Software</option>
                  <option value="ebook">eBook</option>
                </select>
              </form>
            </div>
            {/* Search Component Ends */}

            {/* Results Starts */}
            <div className="ResultsWrapper">
              <div className="row">
                <MediaListHeading heading={media} />
              </div>
              <div className="row">
                <ResultList
                  results={results}
                  handleFavouritesClick={addFavouriteMedia}
                  favouriteComponent={AddFavourites}
                />
              </div>
            </div>
            {/* Results End */}
          </Col>
          {/* Column 1 - Ends */}

          {/* Column 2 - Starts */}
          <Col sm={4} md={4} lg={4}>
            {/* Favourites Start */}
            <div className="FavouritesWrapper">
              <div>
                <MediaListHeading heading="Favourites" />
              </div>
              <div className="row">
                <FavouriteList
                  results={favourites}
                  handleFavouritesClick={removeFavouriteMedia}
                  favouriteComponent={RemoveFavourites}
                />
              </div>
            </div>
            {/* Favourites End */}
          </Col>
          {/* Column 2 - Ends */}
        </Row>
      </Container>
    </div>
  );
}

export default App;
