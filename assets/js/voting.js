// Firebase Credentials
/* 
 *
 * You will need to sign up for a Firebase account and insert your credentials -shown below-
 * before the closing body tag in the _layouts/concept.html file
 *
 * I pushed a branch called 'refactored-topic-page' to the repo that refactors the _layouts/concept.html page as the text
 * below the static image wasn't rendering properly for all tabs. NOTE that this text should
 * only show up once the thumbs up/down functionality is working.
 *
 */
// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "openbeta-local.firebaseapp.com",
  databaseURL: "https://openbeta-local.firebaseio.com",
  storageBucket: "openbeta-local.appspot.com",
};
firebase.initializeApp(config);
firebase.auth().signInAnonymously();

// Get value of thumbs up as page loads
firebase.database().ref("ratings/" + getCurrentTabbedUrl(location) + "/thumbsUpCount").on("value", function(snapshot) {
  var hash = replaceSpecialCharacters($(location).attr('hash'));
  console.log('thumbs up on load ' + snapshot.val())
  $("." + hash + " #thumbsUpCount")[0].innerText = (0 + snapshot.val());
  //updateThumbsUpCount(snapshot.val() + 1);
});
// Get value of thumbs down as page loads
firebase.database().ref("ratings/" + getCurrentTabbedUrl(location) + "/thumbsDownCount").on("value", function(snapshot) {
  var hash = replaceSpecialCharacters($(location).attr('hash'));
  console.log('thumbs down on load ' + snapshot.val())
  $("." + hash + " #thumbsDownCount")[0].innerText = (0 + snapshot.val());
});


// In order to store in Firebase, need to remove special characters
function replaceSpecialCharacters(text) {
  return text.toString().toLowerCase()
    .replace(/[#!.]+/gi, '')
    .replace(/[/]+/gi, '-')
    .replace(/[&]+/gi, '-and-');
};

// We use the the current page and the tab/hash to uniquely identify the thumb data
function getCurrentTabbedUrl(location){
  return replaceSpecialCharacters($(location).attr('pathname') + $(location).attr('hash'));
};

// var currentUrl = replaceSpecialCharacters(window.location.pathname + window.location.hash);
// var hash = removeSpecialCharactersFromHash($(location).attr('hash'));

// Save a new topic page to Firebase database
function writeUrlPaths(topicId) {
     // this is reseting it every time maybe?
  firebase.database().ref("ratings/" + topicId).set({
    thumbsUpCount: 0,
    thumbsDownCount: 0
  });
};

$("#topic-rating #thumbsUp").click(function() {
  console.log("Clicked");
  console.log(replaceSpecialCharacters($(location).attr('pathname')));
  thumbsUpCounter();
});


/*var updateThumbsUpCount = function(startingNumber) {
  $("#thumbsUpCount")[0].innerText = startingNumber;
}*/


// todo make these better.
function thumbsUpCounter() {
  console.log("thumbs up counter");
  var topicThumbCountRef = firebase.database().ref("/ratings/" + getCurrentTabbedUrl(location) + "/thumbsUpCount");
  topicThumbCountRef.transaction(function(count) {
    if(count) {
      count = count + 1;
    } else {
      count = 1;
    }
    return count;
  });
}

function thumbsDownCounter() {
  console.log("thumbsDownCounter");
  var topicThumbCountRef = firebase.database().ref("ratings/" + getCurrentTabbedUrl(location) + "/thumbsDownCount");
  topicThumbCountRef.transaction(function(count) {
    if(count) {
      count = count + 1;
    } else {
      count = 1;
    }
    return count;
  });
};

window.addEventListener('load', function() {
  //writeUrlPaths(replaceSpecialCharacters(window.location.pathname + window.location.hash));

  //var hash = removeSpecialCharactersFromHash($(location).attr('hash'));

  //var like = $("." + hash + " #thumbsUp")[0]; 
  //var like = $("#thumbsUp")[0]; 
  //var dislike = $("." + hash + " #thumbsDown")[0];

  //like.onclick = thumbsUpCounter;
  //dislike.onclick = thumbsDownCounter;
});

$('.accordion-tabs-minimal').on('click', function(e) {
  var currentTabbedUrl = getCurrentTabbedUrl(location);
  //writeUrlPaths(currentTabbedUrl);

  /*var hash = removeSpecialCharactersFromHash($(location).attr('hash'));

  var like = $("." + hash + " #thumbsUp")[0];
  var dislike = $("." + hash + " #thumbsDown")[0];

  like.onclick = thumbsUpCounter;
  dislike.onclick = thumbsDownCounter;*/
});
