/**
 * Created by josephawwal on 28/05/17.
 */

var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var url = 'mongodb://127.0.0.1/booksdb'
var autoIncrement = require("mongodb-autoincrement")
var bcrypt = require("bcrypt")

function setURL(newURL){
    url = newURL

}

function createNewUser(username, password, callback){


    let hash = bcrypt.hashSync(password, 10)
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err)
        assert.ok(db != null)

        db.collection("users").insertOne({username:username, password:hash}, function(err, data){
            assert.equal(null, err)
            callback(result)
        })
    })
}

function findUserByName(username, callback){
    MongoClient.connect(url, function(err, db){

        assert.equal(null, err)
        assert.ok(db != null)

        db.collection("users").findOne({username:username}, function(err, data){
            assert.equal(null, err)
            user = data
            callback(user)

        })
    })
}

function login(username, password, callback){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err)
        assert.ok(db != null)

        db.collection("users").findOne({username:username}, function(err, data){
            if(data == null){
                callback({user: null, success:false})


                    return
                }
                user = data
                if (bcrypt.compareSync(password, user.password)) {
                    callback({user: user, success: true})
                }
                        else {
                            console.log("Authnetication Failed")
                         callback({user:null, sucesss:false})
                     }

        })
    })
}
var userFacade = {
    setURL: setURL,
    createNewUser : createNewUser,
    login : login,
    findUserByName: findUserByName
}

module.exports = userFacade

