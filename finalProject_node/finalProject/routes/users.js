var express = require('express');
var router = express.Router();

const db = require('../db/DbHelper.js');
const mwaJwtManager = require('../jwt/MwaJwtManager');
const mwaResult = require('../core/MwaResult');
const resultStatus = require('../core/ResultStatusEnum');

const collectionName = 'user';

router.post('/login', function (req, res, next) {
  var mail = req.body.mail;
  var password = req.body.password;
  //console.log(mail + ' ' + password);
  db.getConnection(collectionName).then(data => {
    data.findOne({ 'mail': mail, 'password': password }).then(userInDb => {
      var token =mwaJwtManager.generate(userInDb);
      mwaResult.data = token;
      mwaResult.status = resultStatus.SUCCESS;
      res.json(mwaResult);
    });
  });
});


router.get('/', function (req, res, next) {
  db.getConnection(collectionName).then(data => { data.find({}).toArray((err, data) => { res.json(data) }) })
});

module.exports = router;
