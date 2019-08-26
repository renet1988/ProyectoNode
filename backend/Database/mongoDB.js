const mongoose = require('mongoose');
let dbURI;

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

mongoose.set('useFindAndModify', false)

module.exports = {
  mongoose,
  connect: async () => {
    mongoose.Promise = Promise;
    dbURI = 'mongodb://localhost:27017/restaurant';
    return mongoose.connect(dbURI, { useNewUrlParser: true });
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};