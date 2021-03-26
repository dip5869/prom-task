const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

const url = 'mongodb://localhost/prom'
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  var corsOptions = {
    origin:'*',
    methods: 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: [ 'Content-Type', 'Authorization' ]
  };
  app.use(cors(corsOptions));

app.use(express.json())
const meraRoter = require('./routes/route')
app.use('/login',meraRoter)

app.listen(9000, () => {
    console.log(`Server is listening on port 9000`);
});
