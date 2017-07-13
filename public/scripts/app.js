/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (i in tweets) {
      $tweet = createTweetElement(tweets[i]);
      $('#tweet-display').prepend($tweet);
    };
}


function createTweetElement(data) {
  // var $tweet = $("<article>").addClass("tweet");
  var milliseconds = (new Date).getTime();
  var d = Math.floor((milliseconds - data.created_at) / (1000 * 60 * 60 * 24)) ;
  var escaped = escape(data.content.text);
  var tweet = `<article class="tweet">
                <header>
                  <img class='user' src=${data.user.avatars.small}>
                  <span class="tweet-name">${data.user.name}</span>
                  <span class="tweet-account">${data.user.handle}</span>
                </header>
                <p>${escaped}</p>
                <footer>
                <span>${d} days ago</span>
                <span class="toolbar">
                  <i class="fa fa-flag" aria-hidden="true"></i>
                  <i class="fa fa-retweet" aria-hidden="true"></i>
                  <i class="fa fa-heart" aria-hidden="true"></i>
                </span>
                </footer>
              </article>`
  return tweet;
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//// AJAX GET
function localTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (inputtweet){
      renderTweets(inputtweet)
    }
  })
}


// Test / driver code (temporary)
// to see what it looks like
$(document).ready(function () {
  // renderTweets(data);
  localTweets()
}); // to add it to the page so we can make sure it's got all the right elements, classes, etc.