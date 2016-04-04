var express = require('express');
var router = express.Router();

// Võtab meie skeemi, milline andmebaasi "tabeli"/skeem välja näeb
var Topic = require('../models/topic').Topic;


// POST /api/topics/create
router.post('/create/', function(req, res, next) {

    var params = req.body;

    console.log(params);

    if(params.topicName){

        var topicObject = {
            name: params.topicName
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
        res.status(500).send({ error: 'missing parameters' });
    }

});

// GET /api/topics/single/1234
router.get('/single/:id', function(req, res, next) {

    var params = req.params;

    console.log(params);

    if(params.id){
      var conditions = {_id: params.id};
      var update = { $inc: { viewCount: 1 }};
      var options = {new: true};

      var query = Topic.findOneAndUpdate(conditions, update, options)

      query.select("-created -__v");

      query.exec(function(err, entry) {
          // next(err, entry);

          if(err){return res.json({"error":"something went wrong here"});}

          res.json({'success': entry});
      });
    }else{
        res.sendStatus(404);
    }

});

//..add others HERE

module.exports = router;
