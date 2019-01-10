const request = require('request');

// prepare request
var options = {
    url: "http://lopy4v2.data.thethingsnetwork.org/api/v2/query?last=2d",
    headers: {
        "Accept": "application/json",
        "Authorization": "key ttn-account-v2.lThzEOuF-pYKY483NJV_EqnH1XxWJXP2kc1ep0xGIQk"
    }
};

// HTTP request GET
var rep = request(options, (err, res) => {
  if (err) { return console.log(err); }
  //console.log(res);
});