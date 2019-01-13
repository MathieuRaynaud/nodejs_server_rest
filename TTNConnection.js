const ttn = require("ttn");

class TTNConnection {

    static run(appID, accessKey, callback) {
        // discover handler and open mqtt connection
        ttn.data(appID, accessKey)
            .then(function (client) {
                client.on("uplink", function (devID, payload) {
                    // on receive data
                    // console.log("Received uplink from ", devID)
                    // console.log(payload)
                    callback(devID, payload);
                })
            })
            .catch(function (err) {
                console.error(err)
                process.exit(1)
            })

        // discover handler and open application manager client
        ttn.application(appID, accessKey)
            .then(function (client) {
                return client.get()
            })
            .then(function (app) {
                // on connection to TTN
                // console.log("Got app", app)
            })
            .catch(function (err) {
                console.error(err)
                process.exit(1)
            })
    }

}

module.exports = TTNConnection;