$(function () {
    $("#ScrapeButoon").click(function () {
        alert("Scraping Complete");

    });
    $(document).on("click", "p", function () {

        console.log("I CLIKC THIS");
        // Empty the notes from the note section
        $("#notes").empty();
        // Save the id from the p tag
        var thisId = $(this).attr("id");
        $("#notes").append("<h2>" + thisId + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + thisId + "' id='savenote'>Save Note</button>");
  
    })

});


console.log("hfasasdfdsdlfda");