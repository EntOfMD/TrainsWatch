// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBc8V8kvpScxILBHm1bxkY2BdY3gLnw3mQ',
  authDomain: 'trainswatch-81413.firebaseapp.com',
  databaseURL: 'https://trainswatch-81413.firebaseio.com',
  projectId: 'trainswatch-81413',
  storageBucket: 'trainswatch-81413.appspot.com',
  messagingSenderId: '997350962243'
};

firebase.initializeApp(config);

var db = firebase.database();

$('#add-train-btn').on('click', e => {
  e.preventDefault();

  // Grab user input
  let tName = $('#train-name-input')
    .val()
    .trim();

  let tDes = $('#destination-input')
    .val()
    .trim();

  let tTime = $('#train-first-input')
    .val()
    .trim();

  let tFreq = $('#train-frequency-input')
    .val()
    .trim();

  // conditional checking if there are data in form fields.
  // Don't want empty datasets
  if (tName.length === 0 || tDes.length === 0 || tFreq.length === 0) {
    $('#error')
      .html('Please fill out ALL the form fields!')
      .show();
    setTimeout(() => {
      $('#error').hide();
    }, 3000);
  } else {
    //Create temp obj

    let newLine = {
      name: tName,
      destination: tDes,
      startTime: tTime,
      frequency: tFreq
    };

    //uploads temp obj to firebase db
    //!!!!!! IMPORTANT
    db.ref().push(newLine);

    //console logs
    console.log(
      `Entry for ${newLine.name} with destination of ${
        newLine.destination
      } and with start time ${newLine.startTime} with frequent of ${
        newLine.frequency
      } HAS BEEN ADDED!`
    );
    // Clears text values
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#train-first-input').val('');
    $('#train-frequency-input').val('');
    return false;
  }
});

// 3. Create a way to retrieve train info from the trainswatch database.

//gets entries on the DB
db.ref().on('child_added', childSnap => {
  console.log('THIS IS A dataSnapShot ' + childSnap.val());

  //declaring again for when a 'child is added'
  let dtName = childSnap.val().name,
    dtDestination = childSnap.val().destination,
    dtTime = childSnap.val().startTime,
    dtFreq = childSnap.val().frequency;

  //logging the values
  console.log(`${dtName} ${dtDestination} ${dtTime} ${dtFreq} `);

  let arrivalTime = dtTime.split(':');
  let tTime = moment()
    .hours(arrivalTime[0])
    .minutes(arrivalTime[1]);
  let maximumTime = moment.max(moment(), tTime);
  var tMins, aTime;

  if (maximumTime === tTime) {
    aTime = tTime.format('hh:mm A');
    tMins = tTime.diff(moment(), 'minutes');
  } else {
    let timeDiff = moment().diff(tTime, 'minutes');
    let tMod = timeDiff % dtFreq;
    tMins = dtFreq - tMod;

    aTime = moment()
      .add(tMins, 'm')
      .format('hh:mm A');
  }

  console.log(`tMins : ${tMins}
  aTime: ${aTime}
  `);

  //creating a new row in the table
  let newRow = $('<tr>').append(
    $('<td>').text(dtName),
    $('<td>').text(dtDestination),
    $('<td>').text(dtFreq),
    $('<td>').text(aTime),
    $('<td>').text(tMins)
  );

  $('#employee-table>tbody').append(newRow);
});
