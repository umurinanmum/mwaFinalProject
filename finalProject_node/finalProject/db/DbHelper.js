const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const client = new MongoClient('mongodb+srv://mwa:mwa@cluster0-rtumx.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
const str = require('querystring')
class DbHelper {

    getConnection(collectionName) {
        return new Promise((res, rej) => {
            client.connect(err => {
                const collection = client.db("finalProject").collection(collectionName);
                res(collection);
            })
         });
  }

}

module.exports = new DbHelper();