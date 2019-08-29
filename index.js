// index.js
const { fetchMyIP, fetchCoordsByIP, ISSByCoords } = require("./iss");

let promiseChain = new Promise((resolve, reject) => {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log("It worked! Returned IP:", ip);
    resolve(ip);
  });
}).then(ip => {
  fetchCoordsByIP(ip, (error, coords) => {
    ISSByCoords(coords, (err, times) => {
      console.log(times);
    });
  });
});
