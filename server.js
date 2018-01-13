// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var handlebars = require("express-handlebars");

// Initialize Express
var app = express();

var articleArray = "";

app.use(express.static("public"));

//setup handlebars

app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Database configuration
var databaseUrl = "Article";
var collections = ["ArticleData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

//Retrieve data from the db
app.get("/all", function (req, res) {
    // Find all results from the scrapedData collection in the db
    db.ArticleData.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            
            createArrayForList(found);
            //console.log(articleArray);
            res.redirect("/");
        }
    });
});

function createArrayForList(json) {
    var n = 0;
    json.forEach(element => {
        articleArray += "<div class='row'> <p>" + json[n].title + "</p></row>";
        n++;
    });
}



app.get("/scrape", function (req, res) {
    request("https://news.ycombinator.com/", function (error, response, html) {
        var $ = cheerio.load(html);
        $(".title").each(function (i, element) {

            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");

            if (title && link) {

                db.ArticleData.insert({
                        title: title,
                        link: link
                    },
                    function (err, inserted) {
                        if (err) {

                            console.log(err);
                        } else {

                            console.log(inserted);
                        }
                    });
            }
            res.redirect("/");
        });
    });

});


app.get("/", function (req, res) {
    var Articles = [{
        Article: articleArray
    }]
    res.render("index", Articles[0]);
    console.log(Articles[0]);
    console.log("asdf")

    //res.send(console.log("holy fuck this should woek"));
});

// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});