const express = require('express');
const router = express.Router();
const request = require('request');
const Events = require('../models/event-model');

const db = require('../public/javascripts/database-service');
const time = require('../public/javascripts/time-service');
const Day = require('../models/day-model');

//----------------------------------------------------------------------------------------

router.get('/', function(req, res, next) {    
  res.send('Homepage')
});

// get Events for user
router.get('/get-events', function(req, res, next) {
  Events.find( { googleId: req.user.googleId } , function(err, events) {      
    if(err) console.log('Error retrieving data from mongo');
    res.send( events );  
  });  
});

// get Day for user
router.get('/get-day', function(req, res, next) {     
  let currentDate = time.getCurrentDate();
  Day.find({ googleId: req.user.googleId, date: currentDate }, function(err, events) {
    if(err) console.log(err)
    res.send( events );
  })
});

router.post('/delete-events', function (req, res, next) { 
  Events.deleteMany({ googleId: req.user.googleId }, function(err, events) {
    if(err) console.log('Error deleting data from mongo');
    res.send( events );  
  });
});


module.exports = router;