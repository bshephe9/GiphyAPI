(function($) {
$(document).ready(function () {

 var topics = ["Dalmations", "German Shepherds", "Poodles", "Labs", "Corgis", "Pugs"];

 function displayImg() { 

    $("#display-images").empty(); 
    var input = $(this).attr("data-name");
    var limit = 10; 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=WI5STGZoPmBIw0Zekn92Ld0ww54AQ0vB";

    $.ajax({ 
        url: queryURL, 
        method: "GET"
    }).done(function(response) { 
        for(var j= 0; j < limit; j++) { 
            var displayDiv = $("<div>"); 
            var image = $("<img>"); 
            image.attr("src", response.data[j].images.original_still.url); 
            image.attr("data-still", response.data[j].images.original_still.url); 
            image.attr("data-animates", response.data[j].images.original.url); 
            image.attr("data-still", "still"); 
            image.attr("class", "gif"); 
            displayDiv.append(image); 

            var rating = response.data[j].rating; 
            console.log(response); 
            var pRating = $("<p>").text("Rating: " + rating); 
            displayDiv.append(pRating)

            $("#display-images").append(displayDiv);
        }
    });
 }


   function renderButtons() {
        $("#display-buttons").empty();
        for(i = 0; i < topics.length; i++){
            
            var newButton = $("<button>")
            newButton.attr("class", "btn btn-default"); 
            newButton.attr("id", "input"
            )
            newButton.attr("data-name", topics[i]); 
            newButton.text(topicsButtons[i]);
            $("#display-buttons").append(newButton);
        }
    }


function imageChangeState() { 

    var imageChangeState = $(this).attr("data-state"); 
    var animateImage = $(this).attr("data-animate"); 
    var stillImage = $(this).attr("data-still"); 
    if(state == "still") { 
        $(this).attr("src", animateImage); 
        $(this).attr("data-state", "animate");
    }

    else if(state == "animate") { 
        $(this).attr("src", stillImage); 
        $(this).attr("data-state", "still"); 
    }
}

$("#submitPress").on("click", function() { 

    var input = $("#user-input").val().trim;
    form.reset(); 
    displayedButtons.push(input); 

    renderButtons();

    return false; 
})

})(jQuery);
$(document).on("click", ".gif", stillUnstill);

});