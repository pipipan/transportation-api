/**
 * Express Route: /rides
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var Ride = require('../app/models/ride');

/**
 * Here you must add the routes for the Ride entity
 * /rides/:id/routePoints (POST)
 * /rides/:id/routePoints (GET)
 * /rides/:id/routePoint/current (GET)
 */
 router.route('/rides')
     /**
      * GET call for the car entity (multiple).
      * @returns {object} A list of rides. (200 Status Code)
      * @throws Mongoose Database Error (500 Status Code)
      */
     .get(function(req, res){
         /**
          * Add extra error handling rules here
          */
         Ride.find(function(err, rides){
             if(err){
                 res.status(500).send(err);
                 /**
                  * Wrap this error into a more comprehensive message for the end-user
                  */
             }else{
                 res.json(rides);
             }
         });
     })
     /**
      * POST call for the car entity.
      * @param {string} license - The license plate of the new car
      * @param {integer} doorCount - The amount of doors of the new car
      * @param {string} make - The make of the new car
      * @param {string} model - The model of the new car
      * @returns {object} A message and the car created. (201 Status Code)
      * @throws Mongoose Database Error (500 Status Code)
      */
     .post(function(req, res){
       var reqBody = req.body;
       if(reqBody.passenger === undefined ||
          reqBody.driver === undefined ||
          reqBody.car === undefined ||
          reqBody.rideType === undefined ||
          reqBody.startPoint === undefined ||
          reqBody.endPoint === undefined ||
          reqBody.requestTime === undefined ||
          reqBody.pickupTime === undefined ||
          reqBody.dropOffTime === undefined ||
          reqBody.status === undefined ||
          reqBody.fare === undefined ||
          reqBody.route === undefined ||) {
           res.status(400).json({
               "errorCode": 2001,
               "errorMsg": "Property Missing",
               "statusCode": 400
           })
        }
         /**
          * Add aditional error handling here
          */

         var ride = new Ride();
         ride.passenger = req.body.passenger;
         ride.driver = req.body.driver;
         ride.car = req.body.car;
         ride.rideType = req.body.rideType;
         ride.startPoint = req.body.startPoint;
         ride.endPoint = req.body.endPoint;
         ride.requestTime = req.body.requestTime;
         ride.pickupTime = req.body.pickupTime;
         ride.dropOffTime = req.body.dropOffTime;
         ride.status = req.body.status;
         ride.fare = req.body.fare;
         ride.route = req.body.route;

         ride.save(function(err){
             if(err){
                 res.status(500).send(err);
             }else{
                 res.status(201).json(car);
             }
         });
     });

 /**
  * Express Route: /cars/:car_id
  * @param {string} car_id - Id Hash of Car Object
  */
 router.route('/rides/:ride_id')
     /**
      * GET call for the car entity (single).
      * @returns {object} the car with Id car_id. (200 Status Code)
      * @throws Mongoose Database Error (500 Status Code)
      */
     .get(function(req, res){
         /**
          * Add extra error handling rules here
          */
         if (!mongoose.Types.ObjectId.isValid(req.params.ride_id)) {
             res.status(404).send({errorCode: 4000});
             return;
         }

         Ride.findById(req.params.ride_id, function(err, ride){
             if(err){
                 res.status(500).send(err);
             }else{
                 if (!ride)
                     res.sendStatus(404);
                 else
                     res.json(ride);
             }
         });
     })
     /**
      * PATCH call for the car entity (single).
      * @param {string} license - The license plate of the new car
      * @param {integer} doorCount - The amount of doors of the new car
      * @param {string} make - The make of the new car
      * @param {string} model - The model of the new car
      * @returns {object} A message and the car updated. (200 Status Code)
      * @throws Mongoose Database Error (500 Status Code)
      */
     .patch(function(req, res){
         /**
          * Add extra error handling rules here
          */

         Ride.findById(req.params.car_id, function(err, ride){
             if(err){
                 res.status(500).send(err);
             }else{
                 for(var key in req.body) {
                     if(req.body.hasOwnProperty(key)){
                         if(key == 'passenger'){
                             /**
                              * Add extra error handling rules here
                              */
                             ride.passenger = req.body.passenger;
                         }
                         if(key == 'driver'){
                             /**
                              * Add extra error handling rules here
                              */
                             ride.driver = req.body.driver;
                         }
                         /**
                          * Repeat for the other properties
                          */
                     }
                 }

                 ride.save(function(err){
                     if(err){
                         res.status(500).send(err);
                     }else{
                         res.json(ride);
                     }
                 });
             }
         });
     })
     /**
      * DELETE call for the car entity (single).
      * @returns {object} A string message. (200 Status Code)
      * @throws Mongoose Database Error (500 Status Code)
      */
     .delete(function(req, res){
         /**
          * Add extra error handling rules here
          */
         Ride.remove({
             _id : req.params.ride_id
         }, function(err, car){
             if(err){
                 res.status(500).send(err);
             }else{
                 res.json({"message" : "Ride Deleted"});
             }
         });
     });

module.exports = router;
