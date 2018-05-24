/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function handleComposeSubmit(event) {
  event.preventDefault();

  var formDataStr = $(this).serialize();
  var tweetText = $(this).find("textarea").val();


  if (tweetText === '') {
    return $('.counter').tweet("Error: You need write something in tweet to post!");
  } else if (tweetText.length > 140) {
    return $('.counter').tweet("Error: Oww tooo long, only 140 characters ok?");
  } else {
    $.ajax({
      url: "tweets",
      method: "POST",
      data: $(this).serialize(),
      success: function(body) {

        $('.container .new-tweet form')[0].reset();
            $('.counter').text(140);
              loadTweet(data);
            }
    });
  }
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Function to create the Tweet Elements
function createTweetElement(tweetObj) {

  const $tweet = $('<article>').addClass('tweet');

  $tweet.append(`
        <header>
          <img src=${tweetObj.user.avatars.small} alt="userAvatar" />
          <h1>${tweetObj.user.name}</h1>
          <h2>${tweetObj.user.handle}</h2>
        </header>
        <div class="tweetBody">
          <p>
            ${escape(tweetObj.content.text)}
          </p>
        </div>
        <footer>
          <p>${changeTime(tweetObj.created_at)}</p>
          <span>
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </span>
        </footer>
        `);

  return $tweet;

}

// Function to rendenize the tweets
function renderTweets(tweets) {
  const $createHtml = $('<div>');
  tweets.forEach((tweet) => {
    $createHtml.prepend(createTweetElement(tweet));
  });
  $(".tweets-container").html($createHtml);
}

function changeTime(date) {
  var currentDate = Date.now();
  var seconds = (currentDate - date) / 1000 / 60;
  var minutes = (currentDate - date) / 1000 / 60;
  var hours = (currentDate - date) / 1000 / 60 / 60;
  if (minutes < 1) {
    return `${Math.floor(seconds)} seconds ago`;
  } else { if (minutes > 1 && minutes < 60) {
      return `${Math.floor(minutes)} minutes ago`;
    } else { if (minutes > 60 && hours < 24) {
        return `${Math.floor(hours)} hours ago`;
      } else { if (hours > 24) {
          return `${Math.floor(hours / 24)} days ago`;
        }
      }
    }
  }
}

// Function to send the information to the web site
function loadTweets(data) {
  $.ajax({
    url: "/tweets",
    method: "GET",
        // dataType: "json",
    success: function(data) {
      renderTweets(data)
    }
  });
}


$(document).ready(function() {
  $(".new-tweet").hide();
  loadTweets();
  $('#compose').on('submit', handleComposeSubmit);
  $("button").click(function() {
    $(".new-tweet").slideToggle("fast", function() {});
  });
});