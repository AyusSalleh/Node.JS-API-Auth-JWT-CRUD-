var jwt = require('jsonwebtoken')
var config = require('../../config'); // get config file
var express     = require('express');        // call express
var router      = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('listen to auth.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/')
    .post(function(req, res) {
        if (req.body.username == undefined) return res.json({ errors: 'username is required'})       

        var token = jwt.sign({ username: req.body.username}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
        res.status(200).send({ auth: true, token: token });
    });

router.route('/verify')
    .get(function(req, res) {
        if (req.headers.token == undefined) return res.json({ errors: 'token is required'})       
        
        var token = jwt.verify(req.headers.token, config.secret, function(err, decoded) {
            if (err) return res.status(500).send(err)
          });

        res.status(200).send({ auth: true, token: token });
    });

module.exports = router;