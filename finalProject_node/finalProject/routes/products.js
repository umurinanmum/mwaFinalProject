let router = require('express').Router();
let joi = require('joi');
const db = require('../db/DbHelper.js');
const jwt = require('../jwt/MwaJwtManager');

/*
//Users collection
{
  'userid': '1',
  "firstname": '',
  "lastname": '',
  "email": "",
  "password": "",
  ...
}

//Products collection
{
  "productid": "",
  "productname": "",
  "description": "",
  "postdate": "",
  "comments": [
                {
                  "userid": "userid",
                  "text": "",
                  "postdate": "",
                  ...
                }
              ],
  "adduser": "userid",
  ...
}
*/

const collectionName = 'products';

router.get('/', (req, res) => {

    db.getConnection(collectionName).then(data => {
        data.find({status: true})
            .toArray()
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    });
});

router.get('/:productid', (req, res) => {
    if (!req.params.productid)
        return res.status(400).json({success: "ProductID parameter is missing."});

    db.getConnection(collectionName).then(data => {
        data.findOne({ productid: req.params.productid }, (err, data) => {
            if(err) return res.status(500).json(err);
            res.json(data);
        });
    });

});

router.delete('/:productid', (req, res) => {
    if (!req.params.productid)
        return res.status(400).json({success: "ProductID parameter is missing."});

    db.getConnection(collectionName).then(data => {
        data.updateOne({ productid: req.params.productid}, {$set: {status:false}}, (err) => {
            if(err) return res.status(500).json(err);
            res.json({status: 1, success: 'deleted'});
        });
    });

});

router.post('/', (req, res) => {
    if(!req.body) return res.status(400).json({success: "Request body is missing"});

    let {err} = validateProduct(req.body);
    if(err) return res.status(400).json(error.details[0].message);

    db.getConnection(collectionName).then(data => {
        var product = req.body;
        var token = req.headers.authorization.split(' ')[1];
        var currentUser = jwt.verify(token);
        product.user ={
            'id' : currentUser._id,
            'firstName' : currentUser.firstName,
            'lastName' : currentUser.lastName
        }; 
        data.insert(product, (err) => {
            if(err) return res.status(500).json(err);
            res.json({status: 1, success: 'inserted'});
        });
    });

});

router.put('/', (req, res) => {
    if(!req.body) return res.status(400).json({success: "Request body is missing"});

    let {err} = validateProduct(req.body);
    if(err) return res.status(400).json(error.details[0].message);

    db.getConnection(collectionName).then(data => {
        data.update({ productid: req.body.productid}, {$set: req.body}, (err) => {
            if(err) return res.status(500).json(err);
            res.json({status: 1, success: 'updated'});
        });
    });

});

function validateProduct(data){
    const schema = {
        productid: joi.number().integer().min(1).required().toArray,
        productname: joi.string().min(3).required(),
        description: joi.string().min(3).required(),
        postdate: joi.string().min(3).required(),
        adduser: joi.string().min(1).required()
    };

    return joi.validate(data);
};

module.exports = router;
