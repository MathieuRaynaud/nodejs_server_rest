const ttn = require('ttn');
const fs = require('fs');

const appID = 'test_ws_smart_forest';
const accessKey = 'ttn-account-v2.FiripDOuofNNJxWKQfbMW5GDZv26McyOd05I-PeA7MU';

ttn.data(appID, accessKey)
    .then(function (client) {
        client.on("uplink", function (devID, payload) {
            // on receive data
            // console.log("Received uplink from ", devID)
            let data = payload.payload_fields;
            if(data.type === 'Sensors Payload'){
                console.log('Sensor payload received');
                addSensorData(data.name, data.data);
            }
            else {
                console.log('GPS payload received');
                updateGPSdata(data.name, data.lat, data.long, data.alt);
            }
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
        console.log('Connection to TTN established');
    })
    .catch(function (err) {
        console.error(err)
        process.exit(1)
    })

function updateGPSdata(name, lat, long, alt){
    console.log('Updating GPS data...');
    console.log('Name: %s', name);
    console.log('Latitude: %s', lat);
    console.log('Longitude: %s', long);
    console.log('Altitude: %s', alt);
    console.log();
    let file = fs.readFileSync("C:\\Users\\Mathieu\\Documents\\INSA\\5ème année\\Smart Forest\\Smart-Forest-software\\src\\assets\\data.json");
    let json = JSON.parse(file);
    for (let i=0; i<json.length; i++){
        if (json[i].name === name){
            json[i].lat = lat;
            json[i].lon = long;
            json[i].alt = alt;
            console.log("%s updated", json[i].name);
        }
    }
    fs.writeFileSync("C:\\Users\\Mathieu\\Documents\\INSA\\5ème année\\Smart Forest\\Smart-Forest-software\\src\\assets\\data.json", JSON.stringify(json, null, 2));
}

function addSensorData(name, data) {
    console.log('Adding sensor data...');
    console.log('Name: %s', name);
    console.log('Date: %s', data.date);
    console.log('Temperature: %s', data.temp);
    console.log('Humidity: %s', data.hum);
    console.log('Ozone: %s', data.o3);
    console.log('Luminosity: %s', data.lum);
    console.log();
    let file = fs.readFileSync("C:\\Users\\Mathieu\\Documents\\INSA\\5ème année\\Smart Forest\\Smart-Forest-software\\src\\assets\\data.json");
    let json = JSON.parse(file);
    for (let i=0; i<json.length; i++) {
        if (json[i].name === name) {
            console.log(json[i].serie.data);
            json[i].serie.data.push(data);
            console.log("Data added to %s", json[i].name);
        }
    }
    fs.writeFileSync("C:\\Users\\Mathieu\\Documents\\INSA\\5ème année\\Smart Forest\\Smart-Forest-software\\src\\assets\\data.json", JSON.stringify(json, null, 2));

}