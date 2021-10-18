import axios from "axios";

//Test to see whether API is working using axios.get
test("Does the API work correctly", async () => {
  let result = await axios.get("http://localhost:8080/api/search/akon/music");

  //toBeDefined() is used to check that a variable is not undefined.
  expect(result).toBeDefined();

  expect(result).toBeTruthy();
});
