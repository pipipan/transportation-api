//invalid resource name
function INVALID_CAR_PROPERTY(res, reqBody, Car) {
    var car_properties = ["year", "maker", "model", "doorNum", "passNum", "license", "driverID", "insurance"];
    Car.find(function(err, cars) {
      for(var property in reqBody) {
        if(car_properties.indexOf(property) === -1) {
          res.status(400).json({
            "errorCode": 2005,
            "errorMsg": "invalid car attribute keypppp",
            "statusCode": 400,
            "statusTxt": "Bad Request"
          })
        }
      }
    })
}
//Identifier not matching any resource instance
//Invalid property name (given in POST)
//Invalid value for a property (given in POST)
module.exports = {
  throw_invalid_car_properties : INVALID_CAR_PROPERTY
}
