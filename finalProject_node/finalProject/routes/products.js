let router = require('express').Router();
let joi = require('joi');

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

const db = require('../db/DbHelper.js');
const mwaJwtManager = require('../jwt/MwaJwtManager');
const Mwa_Result = require('../core/MwaResult');
const resultStatus = require('../core/ResultStatusEnum');
const userManager = require('../userManager/UserManager');

const collectionName = 'products';

router.get('/', (req, res) => {

    db.getConnection(collectionName).then(data => {
        data.find({})
            .toArray()
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    });

    // req.db.collection('products')
    //    .find({})
    //    .toArray()
    //    .then(data => res.json(data))
    //    .catch(err => res.status(500).json(err));
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

    // req.db.collection('products')
    //     .findOne({ productid: req.params.productid }, (err, data) => {
    //         if(err) return res.status(500).json(err);
    //         res.json(data);
    //     });
});

router.delete('/:productid', (req, res) => {
    if (!req.params.productid)
        return res.status(400).json({success: "ProductID parameter is missing."});

    db.getConnection(collectionName).then(data => {
        data.deleteOne({ productid: req.params.productid}, (err) => {
            if(err) return res.status(500).json(err);
            res.json({status: 1, success: 'deleted'});
        });
    });
    // req.db.collection('products')
    //     .deleteOne({ productid: req.params.productid}, (err) => {
    //         if(err) return res.status(500).json(err);
    //         res.json({status: 1, success: 'deleted'});
    //     });
});

router.post('/', (req, res) => {
    if(!req.body) return res.status(400).json({success: "Request body is missing"});

    let {err} = validateProduct(req.body);
    if(err) return res.status(400).json(error.details[0].message);

    db.getConnection(collectionName).then(data => {
        data.insert(req.body, (err) => {
            if(err) return res.status(500).json(err);
            res.json({status: 1, success: 'inserted'});
        });
    });
    // req.db.collection('products')
    //     .insert(req.body, (err) => {
    //         if(err) return res.status(500).json(err);
    //         res.json({status: 1, success: 'inserted'});
    //     });
});

router.put('/', (req, res) => {
    if(!req.body) return res.status(400).json({success: "Request body is missing"});

    let {err} = validateProduct(req.body);
    if(err) return res.status(400).json(error.details[0].message);

    db.getConnection(collectionName).then(data => {
        data.update({ productid: req.body.productid}, req.body, (err) => {
            if(err) return res.status(500).json(err);
            res.json({status: 1, success: 'updated'});
        });
    });
    // req.db.collection('products')
    //     .update({ productid: req.body.productid}, req.body, (err) => {
    //         if(err) return res.status(500).json(err);
    //         res.json({status: 1, success: 'updated'});
    //     });
});

function validateProduct(data){
    const schema = {
        productid: joi.number().integer().min(1).required().toArray,
        productname: joi.string().min(3).required(),
        description: joi.string().min(3).required(),
        postdate: joi.string().min(3).required(),
        adduser: joi.string().min(3).required()
    };

    return joi.validate(data);
};

module.exports = router;
