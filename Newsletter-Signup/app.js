const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

// this line specifies static folder named public where we have files like sysles.css
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
  // get the data the user sent us using in the post request
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
  var jsonData = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/0957a45462"
  const options = {
    method: "POST",
    auth: "Viksaa99:96956bc14b6a6dde3bd9b29a17264236-us18"
  }

  // Send sing up data to mailchimp servers
  const request =  https.request(url, options, function(response){
    response.on("data", function (data) {

      // Send response to user based on if they where subscribed to Newsletter or not
      if(response.statusCode == 200) {
          res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    })
  });

  request.write(jsonData);
  request.end();
})

// Redirect the user to home page if they clicked "Try again" after they failed to sign up
app.post("/failure", function (req, res) {
  res.redirect("/");
})

// process.env.PORT is a dynamic port that Heroku servers choose to listen on
app.listen(process.env.PORT || 3000 , function (){
  console.log("Server is running on port 3000");
})

// api key 96956bc14b6a6dde3bd9b29a17264236-us18
// list id 0957a45462
