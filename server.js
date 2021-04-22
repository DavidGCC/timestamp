// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
const dateFns = require('date-fns');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (request, response) => {
    const dateInput = request.params.date.includes("-") ? request.params.date : Number(request.params.date);
    const date = new Date(dateInput);
    if (dateFns.isValid(date)) {
        response.json({
            unix: dateFns.getUnixTime(date),
            utc: date.toUTCString()
        })
    } else {
        response.json({
            error: "Invalid Date"
        })
    }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
