const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config();

// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

 // Configure both serve-favicon & static middleware
 // to serve from the production 'dist' folder
//  app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
 app.use(express.static(path.join(__dirname, 'dist')));

// put API routes here, before the 'catch all' route
app.use('/api/users', require('./routes/api/users'));

// THEN the catch-all route
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

 const port = process.env.PORT || 3001;

 app.listen(port, function(){
  console.log(`Express app running on http://localhost:${port}`)  
 })