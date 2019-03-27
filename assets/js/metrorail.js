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
const apiTypes = {
  trainURL: `metrorail/trains/`,
  trainMetrics: `metrorail/metrics`,
  trips: {
    // metrorail/trips/{fromStationCode}/{toStationCode}
    fromStation: undefined,
    toStation: undefined,
    url: `metrorail/trips/`
  },
  tweets: `metrorail/tweets/`,
  trainReports: `metrorail/trains/tags/`,
  indTrainReports: {
    trainId: undefined,
    url: 'metrorail/trains/' + trainId + '/tags/'
  }
};

// Get train info
$.ajax({
  type: 'GET',
  url: config.qURL + apiTypes.trainURL,
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
