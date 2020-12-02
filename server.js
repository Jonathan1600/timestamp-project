


var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static('public'));

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

function timeConverter(unix, type) {
  var a = 0;
  if (type === 1) {
    a = new Date(unix * 1);
  } else {
    a = new Date(unix.toString());
  }

  if (a.toUTCString() == "Invalid Date") {
    return { error: "Invalid Date" }
  } else {
    return { "unix": a.getTime(), "utc": a.toUTCString() }
  }
}

app.get("/api/timestamp/:inputNumber", function (req, res) {
  const { inputNumber } = req.params;
  if (inputNumber.length == 13) {
    res.json(timeConverter(inputNumber, 1));
  } else {
    res.json(timeConverter(inputNumber, 0));
  }
});

app.get("/api/timestamp", (req, res) => {
  var today = new Date();
  res.json({ "unix": today.getTime(), "utc": today.toUTCString() })
}) 

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


 
