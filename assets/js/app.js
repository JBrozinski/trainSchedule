$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAFdyP4v-yKQXrtx-m-Wo8AassfVrf75MU",
    authDomain: "denverbootcamp-21006.firebaseapp.com",
    databaseURL: "https://denverbootcamp-21006.firebaseio.com",
    projectId: "denverbootcamp-21006",
    storageBucket: "denverbootcamp-21006.appspot.com",
    messagingSenderId: "36508316501",
    appId: "1:36508316501:web:08506d8734ec78ddeeb5dc",
    measurementId: "G-EYSP230CMC"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // on click event for submit button

  $("#trainInfoBtn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName")
      .val()
      .trim();
    var destination = $("#destination")
      .val()
      .trim();
    var frequency = $("#frequency")
      .val()
      .trim();
    var initialTime = $("#firstTrain")
      .val()
      .trim();

    console.log(trainName);
    console.log(destination);
    console.log(initialTime);
    console.log(frequency);

    var newTrain = {
      train: trainName,
      trainDest: destination,
      trainArrival: initialTime,
      everyMin: frequency
    };
    //push inputs to database

    database.ref().push(newTrain);
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var currentTime = moment();
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().trainDest;
    var initialTime = moment(childSnapshot.val().trainArrival, "HH:mm");
    var frequency = parseInt(childSnapshot.val().everyMin);
    var minRemain, nextArrival;

    console.log(
      trainName,
      destination,
      initialTime.format("hh:mm a"),
      frequency
    );

    var difference = currentTime.diff(initialTime, "minutes");
    console.log("Diff:", difference);

    if (difference <= 0) {
      nextArrival = initialTime.format("h:mm a");
      minRemain = Math.abs(difference);
    } else {
      var remainder = difference % frequency;
      console.log(remainder);

      minRemain = frequency - remainder;
      console.log(minRemain);

      nextArrival = currentTime.add(minRemain, "minutes").format("h:mm a");
      console.log(nextArrival);
    }

    $("#trainTable > tbody").append(
      "<tr><td>" +
        trainName +
        "</td><td>" +
        destination +
        "</td><td>" +
        nextArrival +
        "</td><td>" +
        frequency +
        "</td><td>" +
        minRemain +
        "</td></tr>"
    );
  });
});
