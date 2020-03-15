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
    var initialTime = moment(
      $("#firstTrain")
        .val()
        .trim(),
      "hh:mm"
    )
      .subtract(1, "years")
      .format("X");

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    console.log(trainName);
    console.log(destination);
    console.log(initialTime);
    console.log(frequency);
    console.log(currentTime);

    var newTrain = {
      train: trainName,
      trainDest: destination,
      trainArrival: initialTime,
      everyMin: frequency
    };

    database.ref().push(newTrain);
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().trainDest;
    var initialTime = childSnapshot.val().trainArrival;
    var frequency = childSnapshot.val().everyMin;

    var trainTime = moment(initialTime).format("hh:mm");

    var difference = moment().diff(moment(trainTime), "minutes");

    var trainRemain = difference % frequency;
    console.log(trainRemain);

    var minRemain = frequency - trainRemain;
    console.log(minRemain);

    var nextArrival = moment()
      .add(minRemain, "minutes")
      .format("hh:mm");
    console.log(nextArrival);

    $("#trainTable > tbody").append(
      "<tr><td>" +
        trainName +
        "</td><td>" +
        destination +
        "</td><td>" +
        frequency +
        "</td><td>" +
        nextArrival +
        "</td><td>" +
        minRemain +
        "</td></tr>"
    );
  });
});
