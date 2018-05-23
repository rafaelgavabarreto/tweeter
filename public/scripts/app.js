/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.


const data = [{
  "user": {
    "name": "Newton",
    "avatars": {
      "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}, {
  "user": {
    "name": "Descartes",
    "avatars": {
      "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
      "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
      "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
    },
    "handle": "@rd"
  },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1461113959088
}, {
  "user": {
    "name": "Johann von Goethe",
    "avatars": {
      "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
      "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
      "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
    },
    "handle": "@johann49"
  },
  "content": {
    "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  },
  "created_at": 1461113796368
}];

$(document).ready(function() {

  // function to validate the tweet if has more than 140 chars and if is not blank
  function validator(tweet) {
    if (tweet === "") {
      $('.counter').tweet("Error: You need write something in tweet to post!");
      return false;
    } else {
      if (tweet.length > 140) {
        $('.counter').tweet("Error: Oww too long, only 140 characters ok?");
        return false;
      } else {
        return true;
      }
    }
  }

  // Ajax - to get and send information to the page without change the page
  $('.container .new-tweet form').submit(function(event) {

    event.preventDefault();

    // Using the function to validade the information inside the tweet
    if (validator($(this).find("textarea").val())) {
      $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: $(this).serialize(),
        success: function(html) {
          $('.container .new-tweet form')[0].reset();
          $('.counter').text(140);
          loadTweet(data);
        }
      });
    }
  });

  // Function to send the information to the web site
  function loadTweet(data) {
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: "GET",
      success: function(data) {
        renderTweets(data)
      }
    });
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
          <p>${new Date(tweetObj.created_at)}</p>
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


  renderTweets(data);

});