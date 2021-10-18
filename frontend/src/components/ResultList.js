import React from "react";

//Style sheets
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ResultList = (props) => {
  /* I assigned my props.favouriteComponent to a variable. This variable is then 
  rendered below within the button tags. */
  const FavouriteComponent = props.favouriteComponent;

  /* This Function will format the media type string that is returned. */
  function formatKind(kind) {
    if (kind == null || kind === "") {
      return "";
    }
    const splitArray = kind.split("-");
    let result = "";
    splitArray.forEach((item, index) => {
      result += item[0].toUpperCase() + item.substring(1);
      if (index !== splitArray.length - 1) {
        result += " ";
      }
    });
    return result;
  }
  return (
    <Container fluid>
      <Row xs={1} md={2} lg={2}>
        {/*Using map function to display each result from the array */}
        {props.results.map((result, index) => (
          <Col key={result.trackId} className="ResultContainer">
            <img
              className="ResultImg"
              src={result.artworkUrl100}
              alt="result_artwork"
            ></img>
            <div className="ResultDetails">
              <p className="ResultsTitle">{result.trackName}</p>
              <p className="ResultsArtist">{result.artistName}</p>
              <p className="ResultsMedia">{formatKind(result.kind)}</p>
            </div>

            {/* onClick eventListener used to add media items to favourites.*/}
            <div>
              <button
                onClick={() => props.handleFavouritesClick(result)}
                className="ResultBtn"
              >
                <FavouriteComponent />
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ResultList;
