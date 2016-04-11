var express = require('express');
var router = express.Router();

// Võtab meie skeemi, milline andmebaasi 'tabeli'/skeem välja näeb
var Topic = require('../models/topic').Topic;

// GET	/api/topics - Returns all topics
router.get('/', function(req, res, next) {
    Topic.find(function(err, topics) {
        if(err){
             console.error(err);
             return res.json(err);
        }
        res.json(topics);
    });
});

// POST /api/topics - Creates new topic with req.body (post) data as JSON
router.post('/', function(req, res, next) {

    var postData = req.body;

    console.log(postData);

    if(postData.name){

        var topicObject = {
            name: postData.name
        };

        var newTopic = new Topic(topicObject);
        newTopic.save(function(err, topic) {

            //handle saving error
            if(err){
                console.error(err);
                return res.json(err);
            }

            //return saved entry
            res.json(topic);
        });

    }else{
        //if missing parameters returs error
        res.sendStatus(400);
    }

});

// GET /api/topics/1234 - Returns single topic
router.get('/:id', function(req, res, next) {

    var params = req.params;

    console.log(params);

    if(params.id){

        var conditions = {_id: params.id};
        var update = { $inc: { viewCount: 1 }};
        var options = {new: true};

        var query = Topic.findOneAndUpdate(conditions, update, options);

        query.select("name created viewCount _id");
        query.exec(function(err, topic) {
            if(err){
                console.error(err);
                return res.json({"error":"did not find any matching topic"});
            }
            res.json(topic);
        });

    }else{
        res.sendStatus(400);
    }

});

// PUT /api/topics/1234 - Updates single topic with req.body data by req.params.id
router.put('/:id', function(req, res, next) {

    var params = req.params;
    var postData = req.body;

    //id in the URL & post data topicName
    if(params.id && postData.name){

        var conditions = {_id: params.id};
        var update = {name: postData.name};
        var options = {new: true};

        var query = Topic.findOneAndUpdate(conditions, update, options);

        query.exec(function(err, topic) {
            if(err){
                console.error(err);
                return res.json({"error":"did not find any matching topic or wrong data to update"});
            }
            res.json(topic);
        });

    }else{
        res.sendStatus(400);
    }

});

// delete /api/topics/1234 - Deletes single topic
router.delete('/:id', function(req, res, next) {

    var params = req.params;

    //id in the URL & post data topicName
    if(params.id){

        var conditions = {_id: params.id};
        var update = {deleted: new Date()};
        var options = {new: true};

        var query = Topic.findOneAndUpdate(conditions, update, options);

        query.exec(function(err, topic) {
            if(err){
                console.error(err);
                return res.json({"error":"did not find any matching topic or wrong data to update"});
            }
            res.json(topic);
        });

    }else{
        res.sendStatus(400);
    }

});

module.exports = router;
