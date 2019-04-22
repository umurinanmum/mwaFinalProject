
const db = require('../db/DbHelper.js');
const Mwa_Result = require('../core/MwaResult');
const resultStatus = require('../core/ResultStatusEnum');
var mongodb = require('mongodb');

const collectionName = 'user';

class UserManager {

    register(user) {
        return new Promise((resolve, rej) => {
            //already added control
            db.getConnection(collectionName).then(connection => {
                connection.findOne({ 'mail': user.mail }).then(userInDb => {
                    if (userInDb) {
                        let mwaResult = new Mwa_Result();
                        mwaResult.status = resultStatus.ALREADY_ADDED;
                        resolve(mwaResult);
                    } else {
                        connection.insertOne(user, (err, result) => {
                            if (err) {
                                let mwaResult = new Mwa_Result();
                                mwaResult.status = resultStatus.UNKNOWN_ERROR;
                                resolve(mwaResult);
                            } else {
                                let mwaResult = new Mwa_Result();
                                mwaResult.status = resultStatus.SUCCESS;
                                resolve(mwaResult);
                            }
                        });
                    }
                });
            });
        });
    }

    getAllUsers() {
        return new Promise((resolve, rej) => {
            db.getConnection(collectionName).then(connection => {
                connection.find().toArray((err, data) => {
                    let mwaResult = new Mwa_Result();
                    mwaResult.data = data;
                    mwaResult.status = resultStatus.SUCCESS;
                    resolve(mwaResult);
                });
            });
        });
    }

    delete(id) {
        return new Promise((resolve, rej) => {
            db.getConnection(collectionName).then(connection => {
                connection.findOne({ '_id': new mongodb.ObjectID(id) }).then(userInDb => {
                    if (userInDb) {
                        console.log('delete user in db : ' + userInDb);
                        userInDb.isDeleted = true;
                        connection.update({ '_id': new mongodb.ObjectID(id) }, userInDb).then(updateRes => {
                            let mwaResult = new Mwa_Result();
                            mwaResult.status = resultStatus.SUCCESS;
                            resolve(mwaResult);
                        });
                    } else {
                        let mwaResult = new Mwa_Result();
                        mwaResult.status = resultStatus.NO_SUCH_OBJECT;
                        resolve(mwaResult); 
                    }
                });
            });
        });
    }


}

module.exports = new UserManager();