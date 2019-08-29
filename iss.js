let request = require("request");
let fetchMyIP = callback => {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    let data = JSON.parse(body);
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode != 200) {
      return callback("error, response not 200", null);
    } else if (data.ip) {
      return callback(null, data.ip);
    } else {
      return callback("error, IP not found", data.ip);
    }
  });
};

let fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    let data = JSON.parse(body);
    if (error) {
      console.log("error");
      callback(error, null);
      return;
    } else if (response.statusCode != 200) {
      return callback("error, responsecode not 200", null);
    } else if (data.status) {
      //console.log("returning coordinates");
      return callback(null, {
        latitude: data.data.latitude,
        longitude: data.data.longitude
      });
    } else {
      console.log("error");
      return callback("error, coordinates not found", null);
    }
  });
};

const ISSByCoords = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`
        ),
        null
      );
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};
//

http: module.exports = { fetchMyIP, fetchCoordsByIP, ISSByCoords };
