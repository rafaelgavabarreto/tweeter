/**************************************************
Program: Tweeter Clone
Developer: Rafael Barreto
Start date: May 21
End Date: May 25
**************************************************/

function handleComposeSubmit(event) {
  event.preventDefault();

  var tweetText = $(this).find("textarea").val();

  if (tweetText === '' || tweetText.split(' ').join('').length === 0) {
    return window.alert("Error: You need write something in tweet to post!");
  } else if (tweetText.length > 140) {
    return window.alert("Error: Oww tooo long, only 140 characters ok?");
  } else {
    $.ajax({
      url: "tweets",
      method: "POST",
      data: $(this).serialize(),
      success: function(data) {
        loadTweets(data);
        $('.container .new-tweet form')[0].reset();
        $('.counter').text(140);
        $(".new-tweet textarea").focus();
      }
    });
  }
}

//Function to previne script attack from html
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
          <p>${escape(moment(tweetObj.created_at).fromNow())}</p>
          <span>
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </span>
        </footer>
        `);

  return $tweet;
}

// Function to send the information to the web site
function loadTweets(data) {
  $.ajax({
    url: "/tweets",
    method: "GET",
    success: function(data) {
      data.forEach((tweet) => {
        $(".tweets-container").prepend(createTweetElement(tweet));
      });
    }
  });
}

// This function load when the page is access or reload
$(document).ready(function() {
  $(".new-tweet").hide();
  $('.tweets-container').empty();
  loadTweets();
  $('#compose').on('submit', handleComposeSubmit);
  $("button").click(function() {
    $(".new-tweet").slideToggle("fast", function() {});
    $(".new-tweet textarea").focus();
  });
});