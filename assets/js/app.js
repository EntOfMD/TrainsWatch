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

  let tTime = moment(
    $('#train-first-input')
      .val()
      .trim(),
    'MM/DD/YYYY'
  ).format('L');
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
  }
  return false;
});

// 3. Create a way to retrieve train info from the trainswatch database.

//gets entries on the DB
db.ref().on('child_added', childSnap => {
  console.log(childSnap.val());

  //declaring again for when a 'child is added'
  let dtName = childSnap.val().name,
    dtDestination = childSnap.val().destination,
    dtTime = childSnap.val().startTime,
    dtFreq = childSnap.val().frequency;

  //logging the values
  console.log(`${dtName} ${dtDestination} ${dtTime} ${dtFreq} `);

  //using moment.js to calculate the start date from today, in months. returns a number
  //   let workedMonths = moment().diff(moment(dtName, 'L'), 'months');

  //   //using that returned number to multiply rate to find $$$$
  //   let eBilled = (workedMonths * eRate).toLocaleString('en-US', {
  //     style: 'currency',
  //     currency: 'USD'
  //   });

  //creating a new row in the table
  let newRow = $('<tr>').append(
    $('<td>').text(dtName),
    $('<td>').text(dtDestination),
    $('<td>').text(dtTime),
    $('<td>').text(dtFreq)
    // $('<td>').text(`$${eRate}`),
    // $('<td>').text(`${eBilled}`)
  );

  $('#employee-table>tbody').append(newRow);
});
