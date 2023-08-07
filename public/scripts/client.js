/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
    {
        "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
    },
    {
        "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd"
        },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    }
]



$(document).ready(function () {

    const loadTweets = function () {
        $.ajax({
            url: 'http://localhost:8080/tweets',
            method: 'GET',
            dataType: 'json',
            success: function (tweets) {
                // Handle the received array of tweets here
                console.log('Received tweets:', tweets);
    
                // Call the function to render the tweets
                renderTweets(tweets);
            },
            error: function (error) {
                // Handle any errors that occur during the request
                console.error('Error loading tweets:', error);
            }
        });
    };
    
    // XSS protection using escape function
    const escape = function (str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };
    
    
    
    // Define the createTweetElement function
    function createTweetElement(tweetData) {
        // Extract tweet data from the tweet object
        const { user, content, created_at } = tweetData;
        const $tweetContainer = $('<div>').addClass('tweet-container');
    
        // Create HTML elements for the tweet structure
        const $article = $('<article>').addClass('tweet');
        const $header = $('<header>').addClass('posted-tweet');
        const $div = $('<div>').attr('id', 'rhonda');
        const $img = $('<img>').attr('src', escape(user.avatars));
        const $name = $('<p>').text(escape(user.name));
        const $handle = $('<p>').text(escape(user.handle));
        const $content = $('<p>').addClass('hello').html(escape(content.text)); // Use html() to display escaped HTML
        const $footer = $('<footer>').addClass('tweets-foot');
        const $timeAgo = $('<span>').addClass('time-ago').text(timeago.format(new Date(created_at)));
        const $iconsDiv = $('<div>').addClass('gif');
        const $flagIcon = $('<i>').addClass('fa-solid fa-flag');
        const $retweetIcon = $('<i>').addClass('fa-solid fa-retweet');
        const $heartIcon = $('<i>').addClass('fa-solid fa-heart');
    
        // Append the HTML elements to build the tweet structure
        $div.append($img, $name);
        $header.append($div, $handle);
        $footer.append($timeAgo, $iconsDiv);
        $iconsDiv.append($flagIcon, $retweetIcon, $heartIcon);
        $article.append($header, $content, $footer);
        $tweetContainer.append($article);
    
        // Return the complete tweet article element
        return $article;
    }
    
    
    const renderTweets = function (tweets) {
        // Loop through the tweets arrayconst 
        $tweetsContainer = $('#tweets-container');
    
        // Clear existing tweets before adding new ones
        $tweetsContainer.empty();
    
        tweets.forEach(function (tweet) {
            // Call the createTweetElement function for each tweet
            const $tweetElement = createTweetElement(tweet);
            // Append the returned jQuery object to the #tweets-container section
            $('#tweets-container').prepend($tweetElement);
        });
    };

    const handleTweetSubmit = function (event) {
        // Prevent default form submission behavior
        event.preventDefault();
        console.log("Form submitted!");

        // Ajax submit event    
        const tweetContent = $('#tweet-text').val();

        hideError();

        // Check if the tweet content is empty or too long
        if (!tweetContent) {
            // Show error message for empty content
            showError("Tweet content cannot be empty.");
        } else if (tweetContent.length > 140) {
            // Show error message for content that is too long
            showError("Tweet content exceeds the maximum length of 140 characters.");
        } else {
            // If content is valid, clear the error message and submit the form
            clearError();


            // Serialize the form data
            const formData = $("form").serialize();

            // Send a POST request with the serialized data to the server
            $.ajax({
                type: 'POST',
                url: '/tweets',
                data: formData,
                
            })
            .then(function (response) {
                // Handle the response from the server (if needed)
                console.log('Form submitted successfully:', response);

                // Clear the textarea after successful submission
                $('#tweet-text').val('');
                

                // Optionally, reload the tweets to display the new tweet
                loadTweets();
                const $counter  = $('.counter');
                //const MAX_TWEET_LENGTH = 140;
                $counter.text(MAX_TWEET_LENGTH);
               
            })

        }
    }
    // Call loadTweets when the document is ready to fetch and render tweets
    loadTweets();

    // event listener for submit button
    $('.tweet-button').click(handleTweetSubmit);

    // event listener for form submission
    $('.form').submit(handleTweetSubmit);

    // Helper function to show the error message
    function showError(message) {
        const $errorElement = $('.error-message');
        $errorElement.text(message).slideDown();
    }

    // Helper function to clear the error message
    function clearError() {
        const $errorElement = $('.error-message');
        $errorElement.hide();
    }

    //helper function to hide the error message
    function hideError() {
        const $errorElement = $('.error-message');
        if ($errorElement.is(':visible')) {
            $errorElement.slideUp();
        }
    }
});
