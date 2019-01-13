/**
 * This server interacts with TTN and MongoDB.
 * When a new data is publishied from TTN, it is
 * inserted into MongoDB.
 * This server provides also a REST API to retrieves
 * all data from MongoDB : only a GET operation is possible.
 */

var express = require("express");
var app = express();
const request = require('request');
var MongoDB = require("./model/MongoDB");
var TTNConnection = require("./TTNConnection");

// mongo parameters
const mongo_host = "localhost";
const mongo_port = 27017;
const mongo_dbname = "myDb";
const collection = "ttn_data";
var mongo_db = new MongoDB(mongo_host, mongo_port, mongo_dbname);

// ttn parameters
const appID = "lopy4v2"
const accessKey = "ttn-account-v2.UMk9He1FNz6lLFhpMCGwWBOYpTDMEuthZ8rlmfVSYIk"

// server parameter
const server_port = 3000;

// *** start ttn connection *** //
TTNConnection.run(appID, accessKey, (devID, payload) => {
    // when a sensor send a new data on TTN
    // insert the new data in the database
    mongo_db.insert(collection, payload);
});
console.log("Starting connection with TTN");

// *** REST API *** //

// set accesses
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// define GET
app.get("/query", (req, res, next) => {
    // prepare request
    mongo_db.findAll(collection, (allData) => {
        res.json(allData);
    });
    
});

// start server
app.listen(server_port, () => {
    console.log("Server running on port %d",server_port)
});