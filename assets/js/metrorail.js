/* Station Codes

https://docs.google.com/spreadsheets/d/13Kz-v3Yjn6ork9vXyl8KLSgzf7KYuGNP9d7HPMd-Kzc/pub?hl=en&single=true&gid=0&output=html
 */

//keeping the config seperate, just in case need to change them in the future
const config = {
  _APIKEY_: `b4139bd1-ea5b-4bc7-aa99-c45f480f5ddd`,
  qURL: `https://dcmetrohero.com/api/v1/`
};

//the urls for query url, for hot-switching
//Any undefined MUST be defined/given value, or it won't work.
const trainPath = {
  trainURL: `metrorail/trains/`,
  trainMetrics: `metrorail/metrics/`,
  trips: {
    // metrorail/trips/{fromStationCode}/{toStationCode}
    fromStation: undefined,
    toStation: undefined,
    url: 'metrorail/trips/' + this.fromStation + '/' + this.toStation
  },
  tweets: `metrorail/tweets/`,
  trainReports: `metrorail/trains/tags/`,
  indTrainReports: {
    trainId: undefined,
    url: 'metrorail/trains/' + this.trainId + '/tags/'
  }
};

const stationPath = {
  stationReports: 'metrorail/stations/tags',
  indStationReports: {
    stationCode: undefined,
    url: 'metrorail/stations/' + this.stationCode + '/tags'
  },
  stationPredictions: 'metrorail/stations/'
};

// Get train info
$.ajax({
  type: 'GET',
  url: config.qURL + trainPath.trainURL,
  contentType: 'application/json',
  xhrFields: {
    withCredentials: false
  },
  headers: {
    apiKey: config._APIKEY_
  }
}).then(res => {
  console.log(res);
});
