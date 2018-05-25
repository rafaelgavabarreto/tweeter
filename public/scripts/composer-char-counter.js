$(document).ready(function() {
  $('.new-tweet').on('keyup', '#compose textarea', function() {
    var charType = $(this).val().length;
    var charLeft = 140 - charType;
    var counter = $(this).siblings('footer').children('span');

    counter.text(charLeft);

    if (charLeft < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});