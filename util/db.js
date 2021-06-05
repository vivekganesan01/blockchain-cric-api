const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://gameuser:gameuser2020@gametheory-cricket-bc-4dki7.mongodb.net/gametheory?retryWrites=true&w=majority";
// const URI = "mongodb://localhost:27017/";
let _db_name;

/**
 * Helps to connect to the mongo server.
 * 
 * @param {*} callback funtion.
 */
const mongoConnect = (callback) => {
  console.log("Started - Project setup");
  MongoClient.connect(URI, { useUnifiedTopology: true }).then(client => { 
      console.log("DB Connection established !");
      _db_name = client.db("gametheory");
      console.log("Connected db !");
      callback();
    }).catch(err => {
      console.log("DB network error");
      console.log(error);
      throw err;
    });
};

/**
 * Returns the active DB connection.
 */
const db = () => {
  if (_db_name) {
    return _db_name;
  } else {
    throw "No DB Found !!"
  }
};

exports.mongoConnect = mongoConnect;
exports.db = db;