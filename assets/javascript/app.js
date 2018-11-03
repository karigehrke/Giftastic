var topics = ["Boston", "Chicago", "Charlotte", "Los Angeles", "New York", "Dallas", "Denver", "Atlanta", "Seattle"];

for (var i = 0; i < topics.length; i++) {

    var optButton = $('<button>')
        .attr('data-city', topics[i])
        .text(topics[i]);

    //var buttons = $("<button>"+ topics[i] + "</button>") 
    $("#topics").append(optButton);

   // var state = $("<div>").attr("data-state", topics[i]);
   // $("#topics").append(state);
}

$("button").on("click", function () {

    var city = $(this).attr("data-city");

    // Constructing a queryURL using the city name 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        city + "&api_key=WO1W2mC9OIupctxemXOSpoyAFHGe5LuA&rating=G&limit=10";

    console.log(queryURL);

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // After data comes back from the request
        .then(function (response) {

            console.log(response);

            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var cityDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var cityImage = $("<img>");

                // Setting the src attribute of the image to a property pulled off the result item
                //add attributes "data state, data animate, etc so they can be referenced below"
                cityImage.attr("src", results[i].images.fixed_height.url, "data-state", "data-animate", "data-still");
                cityImage.addClass("gif");

                            // Appending the paragraph and image tag to the cityDiv
                            cityDiv.append(cityImage);
                            cityDiv.append(p);

                            // Prependng the cityDiv to the HTML page in the "#gifs-appear-here" div
                            $("#gifs-appear-here").prepend(cityDiv);
                        }
                    });
                })
                //this deals solely with what happens when the image is clicked. make sure these things are defined above
                //this comes after the ajax call but outside of the ajax function
                $(".image-holder").on("click", ".gif", function () {

                        var state = $(this).attr("data-state");

                        if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                       } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
            
        
                       }
                    })