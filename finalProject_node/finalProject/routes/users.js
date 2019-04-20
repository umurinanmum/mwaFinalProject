var express = require('express');
var router = express.Router();

const db = require('../db/DbHelper.js');

const collectionName = 'user';

/* GET users listing. */
router.get('/', function (req, res, next) {
  db.getConnection(collectionName).then(data => { data.find({}).toArray((err, data) => { res.json(data) }) })
});

module.exports = router;
