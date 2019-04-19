var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Starting to Final Project');
});

app.listen(3000, function () {
  console.log('Final Project Backend is running on 3000!');
});