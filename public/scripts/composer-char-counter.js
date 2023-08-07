const MAX_TWEET_LENGTH = 140;

$(document).ready(function () {
  // Get the textarea DOM node using the same selector
  //const textarea = document.querySelector('.text');

  // Convert the textarea DOM node to a jQuery object
  const $textarea = $('.text');

  // Get the output element using the same selector
  const $counter = $('.counter');

  // Get the max tweet length from the data attribute
  //const MAX_TWEET_LENGTH = parseInt($textarea.attr('data-max-length'), 10);

  // Set the max tweet length in the output element
  $counter.text(MAX_TWEET_LENGTH);

  // Set the max tweet length in the error message
  $('#max-tweet-length').text(MAX_TWEET_LENGTH);
  const updateCounter = function () {
    const inputValue = $('.text').val(); // Get the value of the textarea using jQuery
    const currentLength = inputValue.length;
    const remainingChars = MAX_TWEET_LENGTH - currentLength;

    // Update the content of the output element with the remaining characters
    $('.counter').text(remainingChars);

    if (remainingChars < 0) {
      $('.counter').addClass("invalid");
    } else {
      $('.counter').removeClass("invalid");
    }
  }
  // Registering an event handler for the textarea element
  $textarea.on("input", updateCounter);

   // Hover effect for the tweet container
   $('.tweet-container').hover(function () {``
    $(this).addClass('tweet-container-shadow');
  }, function () {
    $(this).removeClass('tweet-container-shadow');
  });
});


