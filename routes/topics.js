var express = require('express');
var router = express.Router();

// Võtab meie skeemi, milline andmebaasi "tabeli"/skeem välja näeb
var Topic = require('../models/topic').Topic;


//  GET	/api/topics - Returns all topics

router.get('/', function(req, res, next){
    Topic.find(function(err, topics){
        if(err){
            console.error(err);
            return res.json(err);
        }res.json(topics);
      });
});

// POST /api/topics
router.post('/', function(req, res, next) {

    var params = req.body;

    console.log(params);

    if(params.name){

        var topicObject = {
            name: params.name
        };

        var newTopic = new Topic(topicObject);
        newTopic.save(function(err, entry) {

            //handle saving error
            if(err){ return res.json(err); }

            //return saved entry
            res.json({"successs": entry});
        });

    }else{
        //if missing parameters returs error
        res.status(400).send({ error: 'missing parameters' });
    }

});

// GET /api/topics/:id
router.get('/:id', function(req, res, next) {

    var params = req.params;

    console.log(params);

    if(params.id){
      var conditions = {_id: params.id};
      var update = { $inc: { viewCount: 1 }};
      var options = {new: true};

      var query = Topic.findOneAndUpdate(conditions, update, options);

      query.select("name created viewCount _id");

      query.exec(function(err, entry) {
          // next(err, entry);

          if(err){return res.json({"error":"something went wrong here"});}

          res.json({'success': entry});
      });
    }else{
        res.sendStatus(400);
    }

});

//..add others HERE

// PUT /api/topics/1234 - Updates single topic with req.body data by req.params.id

router.put('/:id', function(req, res, next){

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
