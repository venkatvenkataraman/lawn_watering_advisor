console.log("In controllers/watsonHelpController.js");
const db = require("../models");
var inMemZone;
const VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");
var fs = require("fs");

const axios = require("axios");
var countOfZoneLoop = 0;
var zonesClassificationData=[];

// ============  Watson related code ===============

function askWatsonAboutZone(images_file, cb) {
  
  var visualRecognition = new VisualRecognitionV3({
    api_key: '96b73c031b0fade5e9797f507c13f34541902f2c',
    version: '2016-05-20'
  });

  // var images_file= fs.createReadStream(zoneImage);
  var classifier_ids = ["DefaultCustomModel_30404095"];
  var threshold = 0.6;

  var params = {
  images_file: images_file,
  classifier_ids: classifier_ids,
  threshold: threshold
  };
  err=null;
  watsonClass=null;
  visualRecognition.classify(params, function(err, response) {
    if (err) {
      console.log(err);
      cb(err, watsonClass);
    }
    else {
      console.log("In watsonHelpController.js/askWatsonAboutZone");
      console.log(JSON.stringify(response, null, 2));
      var watsonClass = JSON.stringify( response.images[0].classifiers[0].classes[0].class);
      var watsonConfidence = JSON.stringify(response.images[0].classifiers[0].classes[0].score);
      console.log ('Class and Confidence are ', watsonClass, " ", watsonConfidence);
      cb(err, watsonClass);
    }
    
  });
}
//  ====== End of Watson related code

// var watsonClass = 
// function callWatson(imageStream, cb) {

// }
// function findAll(req, res) {
//   db.WateringZone
//     .find(req.query)
//     .sort({ date: -1 })
//     .then(dbWateringZone => res.json(dbWateringZone))
//     .catch(err => res.status(422).json(err));
// }

function writeToWateringZoneDB(zoneNumber, watsonClass){
  console.log("Now ready to update watsonImageClass field in the wateringZone DB");
   db.WateringZone
   .find({"zoneNumber": zoneNumber}, function(err, inMemZone) {
    if (!err){ 
      console.log("In watsonHelpController.js/writeToWateringZoneDB #1");
      console.log("zoneNumber: ", zoneNumber, " inMemZone: ", inMemZone, "watson class for zone: ", watsonClass);       
    } else {throw err;}
    })
   .then (
      dbWateringZone => {console.log("In watsonHelpController.js/writeToWateringZoneDB #2");
      // inMemZone.watsonImageClass = watsonClass;
      inMemZone[0].watsonImageClass = watsonClass;
      console.log("In watsonHelpController.js/writeToWateringZoneDB #2");
      console.log("zoneNumber: ", zoneNumber, " inMemZone: ", inMemZone)}
   )

   
  // db.WateringZone[zoneNumber].watsonImageClass = watsonClass;
  // db.WateringZone[zoneNumber].zoneImageDate = new Date();
}

// Compute zone status based on some simple logic
computeZoneStatus = (zoneNumber,cb) => {
  // Look at the zone details in the zone table and determine if and when to water
  // Ask watson for the image classification. If it syas 'Healthy' then no watering is needed.
  // If it says 'Sick' then wantering is needed.  As for when to water, you look at the watering restrictions
  // and decide the earliest time the zone can be watered.

  // const zoneNumber = 4;  //  *** Hardwired for now ****
  
  const zoneImage = "./controllers/images/zone"+(zoneNumber+1)+".jpg";
  console.log("zoneNumber: ",zoneNumber, "; zone image: ", zoneImage);
  var imageStream = fs.createReadStream(zoneImage);
  var watsonClass = null;
  askWatsonAboutZone(imageStream, function (err, myZoneClass) {
    if (err) {
      console.log("In watsonHelpController.js/computeZoneStatus #2");
      console.log("Sorry! Watson did not classify Zone", zoneNumber);
    }
    else {
      if (myZoneClass !== 'unkown') {
        console.log("In watsonHelpController.js/computeZoneStatus #1");
        console.log("Watson classified Zone " + zoneNumber + " as " + myZoneClass);
      }
    }
    if (myZoneClass === 'SickGrass')
       {watsonClass="Sick";
        console.log("In watsonHelpController.js/computeZoneStatus #2");
        console.log("watsonClass for Zone " + zoneNumber + " is " + watsonClass);
        zonesClassificationData[zoneNumber] = watsonClass;
        writeToWateringZoneDB(zoneNumber, watsonClass);
        cb();
      }
    else if (myZoneClass === 'HealthyGrass')
        {watsonClass="Healthy";
        console.log("In watsonHelpController.js/computeZoneStatus #2");
        console.log("watsonClass for Zone " + zoneNumber + " is " + watsonClass);
        zonesClassificationData[zoneNumber] = watsonClass;
        writeToWateringZoneDB(zoneNumber, watsonClass);
        cb();
        }
    else {watsonClass='unknown';
          console.log("In watsonHelpController.js/computeZoneStatus #2");
          console.log("watsonClass for Zone " + zoneNumber + " is " + watsonClass);
          zonesClassificationData[zoneNumber] = watsonClass;
          writeToWateringZoneDB(zoneNumber, watsonClass);
          cb();
    };
    
  });


  // var watsonClass = callWatson(imageStream, function(err, result){
  //     if (err) {console.log("Error in callWatson")}
  //     else{
  //       console.log("Result from callWatson: ", result)
  //     }
  // });

        // console.log("watsonClass: ", watsonClass); 
    // if (myZoneData.watsonImageClass === 'Healthy') {
    //   console.log ('No watering needed for zone' + zoneNumber);
    //   myZoneData.zoneStatus = 'AW';  // pretend it is already watered
    // }
    // else { if (myZoneData.watsonImageClass === 'Sick'){
    //         console.log ('Watering Needed for zone'  + zoneNumber)
    //         myZoneData.zoneStatus = 'NW';
    //   // check watering restrictions and set the next watering date
    //   //  *** Need explanation from Venkat on how the watering restrictions are specified
    //   }
    // }
 
  }

 function zoneLoop(cb) {
  console.log("In watsonHelpController.js/Now identifying images to be processed");
  for (let index = 0; index < 6; index++) {
    computeZoneStatus(index, function(){
      countOfZoneLoop++;
    });
  }
  // while (countOfZoneLoop < 5) {};
  // cb();
 }

module.exports = {
  classifyAndUpdateZoneStatuses: function(req, res) {
    console.log("In controller/watsonHelpController");
    console.log("READY TO ISSUE API CALL TO WATSON AND GET BACK RESULTS");
    //HARDCODED FOR ZONE 4
    // computeZoneStatus(4);
    //HANDLE ALL ZONES - 1 THROUGH 6
    zoneLoop(function(){console.log("zonesClassificationData: ", zonesClassificationData)});
    // console.log("Now ready to update watsonImageClass field in the wateringZone DB");
  }
  
};
  //   db.zoneDB
  //   var alteredResponse = [];
  //   for (let index = 0; index < response.data.forecast.simpleforecast.forecastday.length; index++) {
  //     alteredResponse[index] = {
  //                                         epoch:  response.data.forecast.simpleforecast.forecastday[index].date.epoch,     
  //                                           day:  response.data.forecast.simpleforecast.forecastday[index].date.weekday_short,
  //                                      timeDate:  response.data.forecast.simpleforecast.forecastday[index].date.pretty,
  //                                      tempHigh:  response.data.forecast.simpleforecast.forecastday[index].high.fahrenheit,
  //                                       tempLow:  response.data.forecast.simpleforecast.forecastday[index].low.fahrenheit,
  //                                    conditions:  response.data.forecast.simpleforecast.forecastday[index].conditions,
  //                                    // <img src="http://icons.wxug.com/i/c/k/clear.gif" alt=""/>
  //                                    // <img src="http://icons.wxug.com/i/c/k/cloudy.gif" alt=""/>
  //                                //  conditionsURL:  '<img src="'+response.data.forecast.simpleforecast.forecastday[index].icon_url+'" alt=""/>',
  //                                 conditionsURL:  response.data.forecast.simpleforecast.forecastday[index].icon_url,
  //                                        avgHum:  response.data.forecast.simpleforecast.forecastday[index].avehumidity,
  //                                           pop:  response.data.forecast.simpleforecast.forecastday[index].pop
  //                                };
  //   } //for
  //  console.log("____________alteredResponse____________");
  //  console.log(alteredResponse);
  //  db.WateringZone
  //      .removeDB
  //      .create(alteredResponse);

    // db.CityWateringRest
    //   .find(req.query)
    //   .sort({ date: -1 })
    //   .then(dbCityWateringRest => res.json(dbCityWateringRest))
    //   .catch(err => res.status(422).json(err));

