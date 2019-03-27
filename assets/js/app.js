// Initialize Firebase

firebase.initializeApp(config);

var db = firebase.database();

$('#add-train-btn').on('click', e => {
    e.preventDefault();

    // Grab user input
    let eName = $('#employee-name-input')
        .val()
        .trim();

    let eRole = $('#role-input')
        .val()
        .trim();

    let eStart = moment(
        $('#start-input')
            .val()
            .trim(),
        'MM/DD/YYYY'
    ).format('L');
    let eRate = $('#rate-input')
        .val()
        .trim();

    // conditional checking if there are data in form fields.
    // Don't want empty datasets
    if (
        eName.length === 0 ||
        eRole.length === 0 ||
        // eStart === 'Invalid date' ||
        eRate.length === 0
    ) {
        $('#error')
            .html('Please fill out ALL the form fields!')
            .show();
        setTimeout(() => {
            $('#error').hide();
        }, 3000);
    } else {
        //Create temp obj

        let newEmp = {
            name: eName,
            role: eRole,
            start: eStart,
            rate: eRate
        };

        //uploads temp obj to firebase db
        db.ref().push(newEmp);

        //console logs
        console.log(
            `Entry for ${newEmp.name} with role of ${
                newEmp.role
            } with starting date on ${newEmp.start} and payrate of ${
                newEmp.rate
            } HAS BEEN ADDED!`
        );
        // Clears text values
        $('#employee-name-input').val('');
        $('#role-input').val('');
        $('#start-input').val('');
        $('#rate-input').val('');
    }
});

// 3. Create a way to retrieve employees from the employee database.

//gets entries on the DB
db.ref().on('child_added', childSnap => {
    console.log(childSnap.val());

    //declaring again for when a 'child is added'
    let eName = childSnap.val().name,
        eRole = childSnap.val().role,
        eStart = childSnap.val().start,
        eRate = childSnap.val().rate;

    //logging the values
    console.log(`${eName} ${eRole} ${eStart} ${eRate} `);

    //using moment.js to calculate the start date from today, in months. returns a number
    let workedMonths = moment().diff(moment(eStart, 'L'), 'months');

    //using that returned number to multiply rate to find $$$$
    let eBilled = (workedMonths * eRate).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    //creating a new row in the table
    let newRow = $('<tr>').append(
        $('<td>').text(eName),
        $('<td>').text(eRole),
        $('<td>').text(eStart),
        $('<td>').text(workedMonths),
        $('<td>').text(`$${eRate}`),
        $('<td>').text(`${eBilled}`)
    );

    $('#employee-table>tbody').append(newRow);
});
