(function($) {
$(document).ready(function () {

 var topics = ["Dalmations", "German Shepherds", "Poodles", "Labs", "Corgis", "Pugs", "Beagles", "Boxers"];

 var buttonFunctions = { 

    buttonHolder: $(".dynamic-button-holder"),

    listToButtons: function(list) { 

        buttonFunctions.buttonHolder.empty();

        list.map(buttonFunctions.stringToButton);
    },

    stringToButton: function(str) { 
        var button = $("<button>"); 
        var span = $("<span>");
        span.text(str);
        button.addclass("btn btn-info gif-button");
        button.attr("data-topic", srt);
        button.append(span);
        buttonFunctions.buttonHolder.append(button);
    }
 };

 buttonFunctions.listToButtons(topics);

 $("#submit-button").on("click", function() {

    var text = $("#topicAddition").val().trim(); 
    $("#topicAddition").val('');

    if ((text !== '') && topics.indexOf(text) === -1) {

        topics.push(text);

        buttonFunctions.listToButtons(topics);
    }
    return false; 

 });

 //API Calling to Scrape Giphs
    var queryMethod = 'GET';
    var baseURL = 'https://api.giphy.com/v1/gifs/';
    var APIKey = "WI5STGZoPmBIw0Zekn92Ld0ww54AQ0vB&";
    var limit = '&limit=10';
    // These always go together at the end of the query, so concatenate them into one variable.
    var APIKeyAndLimit = APIKey + limit;
 
    $(document).on("click", "gif-button", function() {
        $(".gif-holder").empty();

        var topic = $(this).data("topic").trim(); 
        var term = topic.replace(/[^A-Za-z0-9]/g, '+');
        if (topic.indexOf(topic) < 23) {
            term += "overwatch"; 
        }

        var queryURL = baseURL + "search?q=" + term + "&" + APIKeyAndLimit; 
        
        $.ajax({ 
            url: queryURL,
            method: queryMethod
        }).done(function(response) { 
            var results = response.data;

            createGIF(results, alt = "A GIF related to" + topic);
        });
    });

 $(document).on("click", "#trending-button", function() { 

    $(".gif-holder").empty(); 

    var queryURL = baseURL + "trending?" + APIKeyAndLimit; 

    $.ajax({
        url: queryURL, 
        method: queryMethod
    }).done(function(response){
        var results = response.data;

        createGIF(results, alt = 
            "A trending GIF"); 
    });
 });

 $(document).on('click', '#random-button', function() {
    // Remove any GIFs currently on the page.
    $('.gif-holder').empty();
    // Then call dogapi function.
    dogapiCall();
 });

 var dogapiCall = function() {
    // dogapi call parameters
    // Select random Dog Images
    var dogID = Math.ceil(Math.random() * 721);
    var queryURL = 'https://pokeapi.co/api/v2/pokemon/';

    // Make a dogapi API call for random Dog ID.
    $.ajax(url = queryURL + dogID + '/', method = queryMethod).done(function(response) {
        // Return Dog names.
        var topic = response.species.name;
        // Add 'pokemon' to the search for better results
        var term = topic + '+dog';

    var queryURL = baseURL + "search?a=" + term + "&" + APIKeyAndLimit; 

    $.ajax({
        url: queryURL
    }).done(function(response) { 

        var results = response.data;
        
        if (results.length > 0) { 

            createGIF(results, alt = "A GIF related to " + term); 
        } else {
            dogapiCall();
        }
    }); 
  });

 };

 var createGIF = function(results, alt) {
    // For each GIF result,
    results.map(function(result) {
        // Create a div, an img, and a p tag.
        // Include identifying classes and centering helper classes.
        var gifDiv = $('<div class="gif-div">');
        var gifImage = $('<img class="gif center-block">');
        var p = $('<p class="text-center">');
        // Add image src, alternate src, alt, and state attributes.
        gifImage.attr('src', result.images.fixed_height_still.url);
        gifImage.attr('alt', alt);
        gifImage.attr('data-state', 'still');
        gifImage.attr('data-still', result.images.fixed_height_still.url);
        gifImage.attr('data-active', result.images.fixed_height.url);
        // Add rating text.
        p.text('Rating: ' + result.rating);
        // Add GIF and rating text to gifDiv
        gifDiv.append(p);
        gifDiv.prepend(gifImage);
        // Add gifDiv to the GIF holder.
        $('.gif-holder').prepend(gifDiv);
    });
};


// Click GIF to toggle animation.
$(document).on('click', '.gif', function() {
    var state = $(this).attr('data-state');
    // If the GIF is currently still, animate it.
    if (state == 'still') {
        $(this).attr('src', $(this).data('active'));
        $(this).attr('data-state', 'active');
        // Otherwise, make it still.
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

});
})(jQuery);
});

