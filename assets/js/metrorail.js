/* 
 \\\\\\\\\\\\\\\\\\\\\\
    RESOURCES
 \\\\\\\\\\\\\\\\\\\\\\
 
### Station Codes
https://docs.google.com/spreadsheets/d/13Kz-v3Yjn6ork9vXyl8KLSgzf7KYuGNP9d7HPMd-Kzc/pub?hl=en&single=true&gid=0&output=html
 */

/* 
 \\\\\\\\\\\\\\\\\\\\\\
    Database
 \\\\\\\\\\\\\\\\\\\\\\
 */

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDP1Acl-V-zBrqEEuxSouMS-RsRBVjuky8',
  authDomain: 'trainswatchmetroapi.firebaseapp.com',
  databaseURL: 'https://trainswatchmetroapi.firebaseio.com',
  projectId: 'trainswatchmetroapi',
  storageBucket: 'trainswatchmetroapi.appspot.com',
  messagingSenderId: '640725455569'
};
firebase.initializeApp(config);

/* 
   \\\\\\\\\\\\\\\\\\\\\\
      TRAIN API INFO
   \\\\\\\\\\\\\\\\\\\\\\
   */
//keeping the config seperate, just in case need to change them in the future
const api_config = {
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

/* 
   \\\\\\\\\\\\\\\\\\\\\\
      Variables \ Functions 
   \\\\\\\\\\\\\\\\\\\\\\
   */

function trainInfo(
  id,
  destination,
  dCode,
  line,
  lCode,
  currentLoc,
  ETA,
  currentStCode,
  currentStName,
  prevStCode,
  prevStName,
  nextStDist,
  //   nextStId,
  lat,
  lon,
  date
) {
  this.trainId = id;
  this.Destination = destination;
  this.DestinationCode = dCode;
  this.Line = line;
  this.LocationCode = lCode;
  this.LocationName = currentLoc;
  this.minutesAway = ETA;
  this.currentStationCode = currentStCode;
  this.currentStationName = currentStName;
  this.previousStationCode = prevStCode;
  this.previousStationName = prevStName;
  this.distanceFromNextStation = nextStDist;
  this.lat = lat;
  this.lon = lon;
  this.observedDate = date;
}

const tempTrainArr = [];

/* 
   \\\\\\\\\\\\\\\\\\\\\\
     API CALLS
   \\\\\\\\\\\\\\\\\\\\\\
   */

// Get train info
$.ajax({
  type: 'GET',
  url: api_config.qURL + trainPath.trainURL,
  contentType: 'application/json',
  xhrFields: {
    withCredentials: false
  },
  headers: {
    apiKey: api_config._APIKEY_
  }
}).then(res => {
  for (const key in res) {
  }
});

//Get Tweets
$.ajax({
  type: 'GET',
  url: api_config.qURL + trainPath.tweets,
  contentType: 'application/json',
  xhrFields: {
    withCredentials: false
  },
  headers: {
    apiKey: api_config._APIKEY_
  }
}).then(res => {
  if (res.length > 0) {
    for (const key in res) {
      //append a 'card' bootstrap to div#tweetData
      $('#tweetData').append(`
        <div class="card my-2 mx-5 rounded" style="width: 1       8rem;">
        <div class="card-body">
        <h5 class="card-title text-dark">${res[key].userName}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${res[key].date}</h6>
        <p class="card-text">${res[key].text}</p>
        <a href="${
          res[key].url
        }" target="_blank" class="card-link text-light btn btn-primary rounded">Tweet Link</a>
        
        </div>
        </div>`);
    }
  } else {
    $('#tweetData').append(
      `<p class="text-danger px-3">No related tweets!</p>`
    );
  }
});
