// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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


function timeConverter(UNIX_timestamp, format){
  var a = new Date(UNIX_timestamp * 1000);
  if (format == 1) {
    return a.toUTCString();
  } else {
    return a.getTime();
  }
}


app.get("/api/timestamp/:inputNumber", function (req, res) {
  const { inputNumber } = req.params;
  if (inputNumber.length == 13) {
    var a = new Date(inputNumber * 1);
  res.json({"unix": a.getTime(), "utc": a.toUTCString()});
  }
  var a = new Date(inputNumber.toString());
  res.json({"unix": a.getTime(), "utc": a.toUTCString()});
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


 
