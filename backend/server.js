const app = require('./app');
let morgan = require('morgan');
// const library = require('./Library');

// library.ConsoleColors(true);

const mongoDB = require('./Database/mongoDB');
mongoDB.connect();
app.use(morgan('combined'))

const mins = 2 * 60 * 1000;
let doSomething = function() {
   setInterval(function() {
     console.log("hello");
   }, mins);
}

const port = '5000';
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    //doSomething();
});

