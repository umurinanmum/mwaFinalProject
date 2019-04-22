
const db = require('../db/DbHelper.js');
const Mwa_Result = require('../core/MwaResult');
const resultStatus = require('../core/ResultStatusEnum');

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
            //already added control
            db.getConnection(collectionName).then(connection => {
                connection.find().toArray((err,data) => {
                        let mwaResult = new Mwa_Result();
                        mwaResult.data = data;
                        mwaResult.status = resultStatus.SUCCESS;
                        resolve(mwaResult);
                });
            });
        });
    }
}

module.exports = new UserManager();