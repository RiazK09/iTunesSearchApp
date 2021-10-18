const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");
const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");

// This line is required to parse the request body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// This line is required in order to access the API in the React frontend.
app.use(cors());
// Helmet is used for security purposes.
app.use(helmet({
  contentSecurityPolicy: false,
}));
// Morgan will generate logs immediately.
app.use(morgan("dev"));

// util functions
/* This function will make use of the writeFileSync method to read the data in the 
JSON file.*/
const saveData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("favourites.json", stringifyData);
};

/* This function will make use of the readFileSync method to get the data from the 
  JSON file. 
  • JSON.parse converts the text into a JavaScript object.
  • readFileSync takes two parameters, the path & and optional parameter - 'options' */
const getData = () => {
  const jsonData = fs.readFileSync("favourites.json");
  return JSON.parse(jsonData);
};
// util functions ends

// Homepage: http://localhost:8080/
app.get("/api", (req, res) => res.send("Hello from Express!"));

/* Get Method - This will display all the data in the favourites.json file */
app.get("/api/favourites", (req, res) => {
  const data = getData();
  res.send(data);
});

/* Get Method - This will fetch the iTunes search.
I limited my search to display 20 items at a time. */
app.get("/api/search/:term/:media", (req, res) => {
  const { term, media } = req.params;
  fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&limit=20`)
    .then((res) => res.json())
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

/* Post method to add a new item to the array */
app.post("/api/favourites", (req, res) => {
  const existingFavourites = getData();
  const newFavourites = req.body;
  existingFavourites.push({ ...newFavourites, id: uuid() });
  saveData(existingFavourites);
  res.send({
    success: true,
    msg: "media added successfully to favourites",
  });
});

/* Delete Method */
app.delete("/api/favourites/:id", (req, res) => {
  const id = req.params.id;
  const existingFavourites = getData();
  const updatedData = existingFavourites.filter((api) => api.id !== id);
  saveData(updatedData);
  res.send({
    success: true,
    msg: "media removed successfully.",
  });
});

/* Error message */
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something Broke!");
});

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Port 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`);
});
