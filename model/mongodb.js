var MongoClient = require("mongodb").MongoClient;

class MongoDB {

    constructor(address, port, dbname) {
        this.address = address;
        this.port = port;
        this.dbname = dbname;
        this.url = "mongodb://" + address + ":" + port;
    }

    findAll(collection, callback) {
        MongoClient.connect(this.url, (err, db) => {
            if (err) {
                console.error(err);
                throw err;
            }
            console.log("Connection to " + this.url + " success !");
            var dbo = db.db(this.dbname);

            // get all data
            dbo.collection(collection).find({}).toArray((err, res) => {
                if (err) {
                    throw err;
                }

                // return res into callback function
                callback(res);
                db.close();
                console.log("Db connection closed");
            });
        });
    }

    /**
     * insert into 
     */
    insert(collection, data) {
        MongoClient.connect(this.url, (err, db) => {
            if (err) {
                console.error(err);
                throw err;
            }
            console.log("Connection to " + this.url + " success !");
            var dbo = db.db(this.dbname);

            // insert data
            dbo.collection(collection).insertOne(data, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log("1 document inserted");
                db.close();
            });
        });
    }

}

module.exports = MongoDB;