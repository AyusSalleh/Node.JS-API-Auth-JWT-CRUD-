var jwt         = require('jsonwebtoken')
var config      = require('../../config'); // get config file
var express     = require('express');        // call express
const { json } = require('body-parser');
var router      = express.Router();              // get an instance of the express Router
var https = require('https');

router.use(function(req, res, next) {
    // do logging
    console.log('listen to notification.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/')
    .post(function(request, response) {    
        if (request.body.playerId == undefined) {
            return response.json({ errors: 'playerId is required!'}) 
        } 

        var message = { 
            app_id: "6885d09e-19c2-484d-bde6-77d876ba5ab5",
            contents: {"en": "English Message"},
            include_player_ids: [request.body.playerId] // ["846b4588-5a39-4773-bfcb-337cc6a5f4bbb"]
        };
        
        var headers = {
            "Content-Type": "application/json; charset=utf-8"
        };
        
        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };
          
        var requestOneSignal = https.request(options, function(responseOneSignal) {  
            responseOneSignal.on('data', function(responseMessage) {
                console.log("Response:");

                var jsonResponseMessage = JSON.parse(responseMessage)
                console.log(jsonResponseMessage)

                if (jsonResponseMessage["errors"] != null) {
                    response.status(200).send({ status: false, message: jsonResponseMessage["errors"][0] });
                } else if (jsonResponseMessage["id"] != null) {
                    response.status(200).send({ status: true, message: jsonResponseMessage });
                }

            });
        });
        
        requestOneSignal.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
            response.status(201).send({ status: false });
        });
        
        requestOneSignal.write(JSON.stringify(message));
        requestOneSignal.end();
    });

module.exports = router;