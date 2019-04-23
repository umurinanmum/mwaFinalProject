var express = require('express');
var router = express.Router();

const db = require('../db/DbHelper.js');
const mwaJwtManager = require('../jwt/MwaJwtManager');
const Mwa_Result = require('../core/MwaResult');
const resultStatus = require('../core/ResultStatusEnum');
const userManager = require('../userManager/UserManager');

const collectionName = 'user';

router.post('/login', function (req, res, next) {
  var mail = req.body.mail;
  var password = req.body.password;
  //console.log(mail + ' ' + password);
  db.getConnection(collectionName).then(data => {
    data.findOne({ 'mail': mail, 'password': password }).then(userInDb => {
      if (userInDb) {
        var token = mwaJwtManager.generate(userInDb);
        let mwaResult = new Mwa_Result();
        mwaResult.data = 
        {
          'token' : token,
          'user' : userInDb
        };
        mwaResult.status = resultStatus.SUCCESS;
        res.json(mwaResult);
      } else {
        let mwaResult = new Mwa_Result();
        mwaResult.status = resultStatus.AUTHORIZATION_ERROR;
        res.json(mwaResult);
      }
    });
  });
});

router.post('/register', function (req, res, next) {
  const user = req.body;
  userManager.register(user).then(result => {
    res.json(result);
  });
});


router.get('/', function (req, res, next) {
   userManager.getAllUsers().then(result=>{
    res.json(result);
   });
});

router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
   
  userManager.delete(id).then(result=>{
   res.json(result);
  });
});

module.exports = router;
