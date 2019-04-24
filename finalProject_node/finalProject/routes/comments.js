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
var mongodb = require('mongodb');
const collectionName = 'products';


router.get('/:productid', (req, res) => {
    if (!req.params.productid)
        return res.status(400).json({success: "ProductID parameter is missing."});
    
    db.getConnection(collectionName).then(data => {
        data.aggregate(
            [
              { $match: {  productid : req.params.productid} },
              { $unwind: '$reviews' },
              { $sort: {    'reviews.postdate': -1  }}
            ]
         ).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
       
    });

});

router.delete('/:reviewid', (req, res) => { console.log("delete");
    if (!req.params.reviewid)
        return res.status(400).json({success: "ProductID parameter is missing."});

    db.getConnection(collectionName).then(data => {
        
        data.update({ },{'$pull':{ 'reviews':{'_id':  ObjectId(req.params.reviewid) }}}, (err) => {
            if(err) return res.status(500).json(err);
            res.json({status: 1, success: 'deleted'});
        });
    });
   
});

router.post('/', (req, res) => {
    if(!req.body) return res.status(400).json({success: "Request body is missing"});



   // let {err} = validateProduct(req.body);
   // if(err) return res.status(400).json(error.details[0].message);

    db.getConnection(collectionName).then(data => {
       //console.log(req.body);
       data.update(
           { productid: req.body.productid}, 
           {$push:{reviews:{
               _id:new mongodb.ObjectID(),
               headline: req.body.headline,
               review: req.body.review,
               user:req.body.username,
               raiting:req.body.raiting,
               postdate:req.body.postdate
            }}}, 
           (err,object) => {
                if(err){
                    return res.status(500).json(err);
                } 
                else{
                    console.log('success');
                    res.status(200).json({status: 1, success: 'updated'});
                }
                
            });
    });

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



module.exports = router;
