const express = require("express");
const app = express();

// using node.js to fetch the data
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res) {
  res.sendFile(__dirname + "/index.html");
})

// Responding to user post request (looking for weather for city)
app.post("/", function functionName(req, res) {

    const queryTownName = req.body.cityName;
    const apiKey = "c8346686550556b5fef874ad210fe4c5&units"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryTownName + "&appid="  + apiKey +  "=metric";
    // make get request to fetch the data from url using API
    https.get(url, function (response) {
      // search the response we got for the data
      response.on("data", function (data) {
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          res.write("<p>The weather currently: " + description + "</p>");
          res.write("<h1>Current temperature in " + queryTownName +  " is " + temp + " degrees celsius</h1>");
          res.write("<img src=" + imageURL + ">");
          res.send();
      })
    })
});



app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
