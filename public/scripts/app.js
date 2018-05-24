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
    return window.alert("Error: You need write something in tweet to post!");
  } else if (tweetText.length > 140) {
    return window.alert("Error: Oww tooo long, only 140 characters ok?");
  } else {
    $.ajax({
      url: "tweets",
      method: "POST",
      data: $(this).serialize(),
      success: function(body) {

        $('.container .new-tweet form')[0].reset();
        $('.counter').text(140);
        loadTweets();
      }
    });
  }
}

function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Function to create the Tweet Elements
function createTweetElement(tweetObj) {

  const $tweet = $('<article>').addClass('tweet');

  // Protection for all the fields in case the user try to change dynamically
  $tweet.append(`
        <header>
          <img src=${escape(tweetObj.user.avatars.small)} alt="userAvatar" />
          <h1>${escape(tweetObj.user.name)}</h1>
          <h2>${escape(tweetObj.user.handle)}</h2>
        </header>
        <div class="tweetBody">
          <p>
            ${escape(tweetObj.content.text)}
          </p>
        </div>
        <footer>
          <p>${escape(changeTime(tweetObj.created_at))}</p>
          <span>
            <div class="fas fa-flag"></div>
            <div class="fas fa-retweet"></div>
          </span>
        </footer>
        `);

  return $tweet;

}
            // <div id="like" data-id = ${escape(tweet._id)} class="fas fa-heart"></div>
            // <div id="likeNum" data-id = ${escape(tweet._id)}>0</div>

function changeTime(date) {
  var currentDate = Date.now();
  var seconds = (currentDate - date) / 1000;
  var minutes = (currentDate - date) / 1000 / 60;
  var hours = (currentDate - date) / 1000 / 60 / 60;
  console.log(seconds,minutes,hours,Date.now());
  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  } else {
    if (minutes > 1 && minutes < 60) {
      return `${Math.floor(minutes)} minutes ago`;
    } else {
      if (minutes > 60 && hours < 24) {
        return `${Math.floor(hours)} hours ago`;
      } else {
        if (hours > 24) {
          return `${Math.floor(hours / 24)} days ago`;
        }
      }
    }
  }
}

// Function to rendenize the tweets
function renderTweets(tweets) {
  const $createHtml = $('<div>');
  tweets.forEach((tweet) => {
    $createHtml.prepend(createTweetElement(tweet));
  });
  $(".tweets-container").html($createHtml);

}

// Function to send the information to the web site
function loadTweets(data) {
  $.ajax({
    url: "/tweets",
    method: "GET",
    success: function(data) {
      renderTweets(data);
    }
  });
}

// $("#tweets").on("click", "#like", function(event) {

//       const id = $(this).data().id;
//       const element = $(this);

//        $.ajax({url: `tweets/${id}/like`,
//                 method: "PUT",
//                   success: toggleLike
//                 });

//     function toggleLike(res){
//       element.toggleClass("toggled");
//       $(`[data-id=${id}]:last`).text(res);
//     }
//   });


$(document).ready(function() {
  $(".new-tweet").hide();
  loadTweets();
  $('#compose').on('submit', handleComposeSubmit);
  $("button").click(function() {
    $(".new-tweet").slideToggle();
    $('.new-tweet textarea').focus();
    loadTweets();
  });
});