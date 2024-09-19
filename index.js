// index.js - where your node app starts
var express = require('express');
var cors = require('cors');
var app = express();

// Enable CORS so that your API is remotely testable
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the main page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Route to handle date API
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  // If dateString is not provided, use the current date
  if (!dateString) {
    date = new Date();
  } else {
    // If dateString is a number, it's assumed to be a timestamp
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // Otherwise, try parsing the date string
      date = new Date(dateString);
    }
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Return the date in the desired format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
