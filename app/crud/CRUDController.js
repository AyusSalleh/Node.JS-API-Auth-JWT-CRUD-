var jwt = require('jsonwebtoken')
var config = require('../../config'); // get config file
var express     = require('express');        
var router      = express.Router();   
var Bear        = require('../models/bear');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('listen to bear.');
    var token = jwt.verify(req.headers.token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send(err)
      });
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/')

    // create a bear
    .post(function(req, res) {
        if (req.body.bear_name == undefined) return res.json({ errors: 'bear_name is required'})
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.bear_name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        }); 
    })
    
    // get a bear
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


router.route('/:bear_id')

    // get the bear with bear id
    .get(function(req, res) { 
        if (req.params.bear_id == undefined) return res.json({ errors: 'bear_id is required'})       
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) return res.status(500).send(err);
            res.json(bear);
        });
    })
    
    // update the bear with id
    .put(function(req, res) {
        if (req.params.bear_id == undefined) return res.json({ errors: 'bear_id is required'})  
        if (req.body.bear_name == undefined) return res.json({ errors: 'bear_name is required'})
     
        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) return res.status(500).send(err);
            
            bear.name = req.body.bear_name;  // update the bears info
            // save the bear
            bear.save(function(err) {
                if (err) return res.status(500).send(err);
                res.json({ message: 'Bear updated!' });
            });

        });
    })
    
    // delete the bear with id
    .delete(function(req, res) {
        if (req.params.bear_id == undefined) return res.json({ errors: 'bear_id is required'})       
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;