/**
 * Module to handle all the player stats API
 * 
 *      - get all the the ID's
 *      - get all the player name and ID
 *      - get bio stats based on the id
 *      - get player information based on id, name, born, country
 *      - get tests stats for player
 *      - get ODI stats for player
 *      - get t20 stats for player
 *      - get IPL stats for player
 */

const express = require('express');
const player = express.Router();
const db = require('../util/db').db;

// DB parameters
const tests_collection = 'test_match';
const ipl_collection = 'ipl';
const odi_collection = 'odi';
const t20_collection = 't20';
const bio_collection = 'player_bio';
const id_collection = 'player_id';

/**
 *  To get the object size / length of the object
 */
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 * Function fetchs all the player id's.
 */
// todo: Need to update the player-id in the player id collections
player.get("/get-all-player-id", (req, res)=>{
});

/**
 * Function helps to fetch all the player name and their id.
 */
player.get("/get-all-player-name-and-id", (req, res)=>{
    const database = db();
    database
        .collection(id_collection)
        .find({'_id': 2019})
        .next()
        .then(result => {
            let record= {};
            record['id'] = result._id;
            record['result'] = result.param;
            record['total'] = Object.size(result.param);
            res.setHeader("Content-Type", "text/json");
            res.status(200).send(record);
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
});

/**
 * Function helps to fetch all the player name and their id.
 * 
 * @param {string} var Need to pass player ID
 */
player.post("/get-player-bio", (req, res)=>{
    const body = req.body;
    const query = Object.keys(body)[0];
    // set header
    res.setHeader("Content-Type", "text/json");
    if (query !== 'id') {
        result = {
            '_id': null,
            'reason': 'post query is wrong, use id'
        };
        res.status(406).send('Invalid query param, Use: id')
    }
    else {
        const values = Object.values(body)[0];
        const database = db();
        database
            .collection(bio_collection)
            .find({'_id': values})
            .next()
            .then(result => {
                if (result === null) {
                    result = {
                        '_id': null,
                        'reason': 'id does not exists'
                    };
                    res.status(406).send(result);
                } else {
                    res.status(200).send(result);
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }
});

/**
 * Function fetch the player information based on the search query
 * Allowed search filters [id (or/and) name (or/and) born (or/and) country]
 */
player.post("/find-player", (req, res)=>{
    const allowedParamQuery = ['_id', 'name', 'born', 'country'];  // allowed search filters
    let wrongParam = false;
    // set header
    res.setHeader("Content-Type", "text/json");
    const body = req.body;
    const objectKeys = Object.keys(body);
    const objectValues = Object.values(body);
    if (objectKeys.indexOf('id') !== -1) {
        objectKeys[objectKeys.indexOf('id')] = '_id';
    }
    const searchQuery = {};
    for (i = 0; i < objectKeys.length; i++) {
        if (allowedParamQuery.includes(objectKeys[i])) {
            searchQuery[objectKeys[i]] = {'$regex': objectValues[i]};
        } else {
            wrongParam = true;
            break;
        };
    };
    console.log(searchQuery);
    if (wrongParam) {
        result = {
            '_id': null,
            'reason': 'invalid parameter filter, Use either [id (or/and) name (or/and) born (or/and) country]'
        };
        res.status(406).send(result); 
    } else {
        const database = db();
        database.collection(bio_collection).find(searchQuery).toArray(function(err, result) {
            if (err) {
                res.status(404).send("Error occured.");
                throw err;
            } else {
                if (result === null) {
                    result = {
                        '_id': null,
                        'reason': 'record doesnot exists'
                    };
                    res.status(406).send(result);
                } else {
                    res.status(200).send(result);
                }
            }
        });
    };
});

/**
 * Function helps to fetch the player test match stats
 */
player.post("/get-player-tests-stats", (req, res)=>{
    const body = req.body;
    const query = Object.keys(body)[0];
    // set header
    res.setHeader("Content-Type", "text/json");
    if (query !== 'id') {
        result = {
            '_id': null,
            'reason': 'post query is wrong, use id'
        };
        res.status(406).send(result);
    }
    else {
        const values = Object.values(body)[0];
        const database = db();
        database
            .collection(tests_collection)
            .find({'_id': values})
            .next()
            .then(result => {
                if (result === null) {
                    result = {
                        '_id': null,
                        'reason': 'player doesn\'t have test series history'
                    };
                    res.status(406).send(result);
                } else {
                    res.status(200).send(result);
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }
});

/**
 * Function helps to fetch the player IOD match stats
 */
player.post("/get-player-odi-stats", (req, res)=>{
    const body = req.body;
    const query = Object.keys(body)[0];
    // set header
    res.setHeader("Content-Type", "text/json");
    if (query !== 'id') {
        result = {
            '_id': null,
            'reason': 'post query is wrong, use id'
        };
        res.status(406).send(result);
    }
    else {
        const values = Object.values(body)[0];
        const database = db();
        database
            .collection(odi_collection)
            .find({'_id': values})
            .next()
            .then(result => {
                if (result === null) {
                    result = {
                        '_id': null,
                        'reason': 'id does not exists, player doesn\'t have odi history'
                    };
                    res.status(406).send(result);
                } else {
                    res.status(200).send(result);
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }
});

/**
 * Function helps to fetch the player t20 match stats
 */
player.post("/get-player-t20-stats", (req, res)=>{
    const body = req.body;
    const query = Object.keys(body)[0];
    // set header
    res.setHeader("Content-Type", "text/json");
    if (query !== 'id') {
        result = {
            '_id': null,
            'reason': 'post query is wrong, use id'
        };
        res.status(406).send(result);
    }
    else {
        const values = Object.values(body)[0];
        const database = db();
        database
            .collection(t20_collection)
            .find({'_id': values})
            .next()
            .then(result => {
                if (result === null) {
                    result = {
                        '_id': null,
                        'reason': 'id does not exists, player doesn\'t have t20 history'
                    };
                    res.status(406).send(result);
                } else {
                    res.status(200).send(result);
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }
});

/**
 * Function helps to fetch the player ipl match stats
 */
player.post("/get-player-ipl-stats", (req, res)=>{
    const body = req.body;
    const query = Object.keys(body)[0];
    // set header
    res.setHeader("Content-Type", "text/json");
    if (query !== 'id') {
        result = {
            '_id': null,
            'reason': 'post query is wrong, use id'
        };
        res.status(406).send(result);
    }
    else {
        const values = Object.values(body)[0];
        const database = db();
        database
            .collection(ipl_collection)
            .find({'_id': values})
            .next()
            .then(result => {
                if (result === null) {
                    result = {
                        '_id': null,
                        'reason': 'id does not exists, player doesn\'t have ipl history'
                    };
                    res.status(406).send(result);
                } else {
                    res.status(200).send(result);
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }
});


module.exports = player;