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
      * GET call for the ride entity (multiple).
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
     });
     /**
      * POST call for the ride entity.
      * @param {string} license - The license plate of the new car
      * @param {integer} doorCount - The amount of doors of the new car
      * @param {string} make - The make of the new car
      * @param {string} model - The model of the new car
      * @returns {object} A message and the car created. (201 Status Code)
      * @throws Mongoose Database Error (500 Status Code)
      */


module.exports = router;
