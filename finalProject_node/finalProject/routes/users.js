var express = require('express');
var router = express.Router();

const db = require('../db/DbHelper.js');

const collectionName = 'user';


router.post('/login', function (req, res, next) {
  var mail = req.body.mail;
  var password = req.body.password;
  //console.log(mail + ' ' + password);
  db.getConnection(collectionName).then(data => {
    data.findOne({ 'mail': mail, 'password': password }).then(userInDb => {
      res.json(userInDb);
    });
  });
});


router.get('/', function (req, res, next) {
  db.getConnection(collectionName).then(data => { data.find({}).toArray((err, data) => { res.json(data) }) })
});

module.exports = router;
