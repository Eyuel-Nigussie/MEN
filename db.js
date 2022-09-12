//importing mongo client from the mongoDB driver that we've installed
const { MongoClient } = require('mongodb');
//we are going to use this in connectToDb function

let dbConnection 

module.exports = {
    connectToDb: (cb) => {
      MongoClient.connect('mongodb://localhost:27017')
      //connect takes connection string as an argument
      //connection string is like a special mongodb url to connect to database
      /*Now this is asynchronous task which ntakes some time to do and it return some promise
       which we can then tag a then method to fire a function when complete
      */
       .then((client) =>{
        //client represent the client we just created by connecting to databse
          dbConnection = client.db('bookstore')
          return cb()
        })
        .catch(err => {
            console.log(err)   
            return  cb(err) 
        })
    },
    getDb: () => dbConnection

}