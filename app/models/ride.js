/**
 * Mongoose Schema for the Entity Ride
 * @author Clark Jeria
 * @version 0.0.3
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RideSchema   = new Schema({
    /**
     * Here you need to add the rides properties
     * - passenger (reference, Required)
     * - driver (reference, Required)
     * - car (reference, Required)
     * - rideType (String, [ECONOMY, PREMIUM, EXECUTIVE], Required)
     * - startPoint  Object (lat: Decimal, long: Decimal) (latitude/longitude combination, Required)
     * - endPoint Object (lat: Decimal, long: Decimal) (latitude/longitude combination, Required)
     * - requestTime (Number, TimeStamp, Required)
     * - pickupTime (Number, TimeStamp, Required)
     * - dropOffTime (Number, TimeStamp, Required)
     * - status (String, [REQUESTED, AWAITING_DRIVER, DRIVE_ASSIGNED, IN_PROGRESS, ARRIVED, CLOSED], Required)
     * - fare (Number)
     * - route (series of latitude/longitude values)
     */
      passenger: {
          type: String,
          refer: 'Passenger',
          required: true
      },
      driver: {
          type: String,
          refer: 'Driver',
          required: true
      },
      car: {
          type: String,
          refer: 'Car',
          required: true
      },
      rideType: {
          type: String,
          required: true,
          validate: [{
              validator: function (val) {
                  return val === 'ECONOMY' || val === 'PREMIUM' || val === 'EXECUTIVE';
              },
              msg: 'only ECONOMY / PREMIUM / EXECUTIVE available',
              type: 'notvalid'
          }]
      },
      startPoint: {
          type: Schema.Types.Mixed,
          required: true
      },
      endPoint: {
          type: Schema.Types.Mixed,
          required: true
      },
      requestTime: {
          type: Number,
          required: true
      },
      pickupTime: {
          type: Number,
          required: true
      },
      dropOffTime: {
          type: Number,
          required: true
      },
      status: {
          type: String,
          required: true,
          validate: [{
              validator: function (val) {
                  const validVal = ['REQUESTED', 'AWAITING_DRIVER', 'DRIVE_ASSIGNED', 'IN_PROGRESS', 'ARRIVED', 'CLOSED'];
                  return validVal.indexOf(val) >= 0;
              },
              msg: 'invaild ride status, you can only choose REQUESTED, AWAITING_DRIVER, DRIVE_ASSIGNED, IN_PROGRESS, ARRIVED, CLOSED',
              type: 'notvalid'
          }]
      },
      fare: Number,
      route: [{lat: Number, long: Number}]
});

module.exports = mongoose.model('Ride', RideSchema);
