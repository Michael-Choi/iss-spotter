// index.js
const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation()
  .then(body => {
    console.log(body);
  })
  .catch(error => {
    console.log("Error: ", error.message);
  });
