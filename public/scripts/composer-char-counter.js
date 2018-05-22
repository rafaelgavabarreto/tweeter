$(document).ready(function() {
  $('.new-tweet').on('keyup', '#compose textarea', function() {
    const charType = $(this).val().length;
    const charLeft = 140 - charType;
    const counter = $(this).siblings('span');

    counter.text(charLeft);

    if (charLeft < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});