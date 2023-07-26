// function charCounter(tweets){
//         let count = 0;
//         for (let tweet in tweets) {
//             if (tweets.charAt(tweet)) {
//                 count++;
//             }
//         }
//         return count;
//         console.log("hello world!");
//     };

    $(document).ready(function() {
        // Get the textarea DOM node using the same selector
        const textarea = document.querySelector('.text');
  
        // Convert the textarea DOM node to a jQuery object
        const $textarea = $(textarea);
  
        // Get the output element using the same selector
        const $counter = $('.counter');
  
        // Registering an event handler for the textarea element
        $textarea.on("input", function() {
          const charLimit = 140; // Set the character limit here
          const inputValue = $textarea.val(); // Get the value of the textarea using jQuery
          const currentLength = inputValue.length;
          const remainingChars = charLimit - currentLength;
  
          // Update the content of the output element with the remaining characters
          $counter.text(remainingChars);
  
          // Add the "invalid" class to the counter if remainingChars is negative
          if (remainingChars < 0) {
            $counter.addClass("invalid");
          } else {
            $counter.removeClass("invalid");
          }
        });
      });