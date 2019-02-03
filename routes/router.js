const express = require('express');
const router = express.Router();
const request = require('request');
const Events = require('../models/event-model');

const db = require('../public/javascripts/database-service');
const time = require('../public/javascripts/time-service');
const Day = require('../models/day-model');

//----------------------------------------------------------------------------------------

router.get('/', function(req, res, next) {      
  res.send('Waiting for request...')
});

// get Events for user
router.get('/get-events', function(req, res, next) {
  console.log('called API get-events')
  Events.find( { googleId: req.user.googleId } , function(err, events) {      
    if(err) console.log('Error retrieving data from mongo');
    res.send( events );  
  });
});

// get Day for user
router.get('/get-day', function(req, res, next) {     
  console.log('called API get-day')
  let currentDate = time.getCurrentDate();
  Day.find({ googleId: req.form.googleId, date: currentDate }, function(err, events) {
    if(err) console.log(err)
    res.send( events );
  })
});

router.post('/delete-events', function (req, res, next) { 
  console.log('called API delete-events')
  Events.deleteMany({ googleId: req.qs.googleId }, function(err, events) {
    if(err) console.log('Error deleting data from mongo');
    res.send( events );  
  });
});


module.exports = router;