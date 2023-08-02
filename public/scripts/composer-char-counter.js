const MAX_TWEET_LENGTH = 140;
   
   $(document).ready(function() {
        // Get the textarea DOM node using the same selector
        const textarea = document.querySelector('.text');
  
        // Convert the textarea DOM node to a jQuery object
        const $textarea = $(textarea);
  
        // Get the output element using the same selector
        const $counter = $('.counter');
  
        // Registering an event handler for the textarea element
        $textarea.on("input", function() {
          const inputValue = $textarea.val(); // Get the value of the textarea using jQuery
          const currentLength = inputValue.length;
          const remainingChars = MAX_TWEET_LENGTH - currentLength;
  
          // Update the content of the output element with the remaining characters
          $counter.text(remainingChars);
  
          if (remainingChars < 0) {
            $counter.addClass("invalid");
          } else {
            $counter.removeClass("invalid");
          }
        });
      });