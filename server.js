var express = require("express");
var app = express();
const request = require('request');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// define GET
app.get("/query", (req, res, next) => {
    // prepare request
    var options = {
        url: "http://lopy4v2.data.thethingsnetwork.org/api/v2/query?last=2d",
        headers: {
            "Accept": "application/json",
            "Authorization": "key ttn-account-v2.lThzEOuF-pYKY483NJV_EqnH1XxWJXP2kc1ep0xGIQk"
        }
    };

    // HTTP request GET
    request(options, (err, res2) => {
      if (err) { return console.log(err); }
      res.json(JSON.parse(res2.body));
    });
    
});

// start server
const port = 3000;
app.listen(port, () => {
    console.log("Server running on port %d",port)
});