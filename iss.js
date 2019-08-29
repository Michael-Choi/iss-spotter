let request = require("request-promise-native");
let fetchMyIP = () => {
  return request(`https://api.ipify.org?format=json`);
};

let fetchCoordsByIP = data => {
  let ip = JSON.parse(data).ip;
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFlyOverTimes = data => {
  let { latitude, longitude } = JSON.parse(data).data;
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};
//

let nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const { response } = JSON.parse(body);
      return response;
    });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
