const express = require('express');
const router = express.Router();
const time = require('../public/javascripts/time-service');
const Events = require('../models/event-model');
const Day = require('../models/day-model');

//----------------------------------------------------------------------------------------

router.get('/', function(req, res, next) {      
  res.send('Listening for request...')
});

// get Events list for user
router.get('/get-events-list', function(req, res, next) {  
  Events.find( { googleId: req.body.googleId } , function(err, events) {      
    if(err) console.log('Error retrieving data from mongo');    
    res.send( events );  
  });
});

// get Events for user
router.get('/get-merge-events', function(req, res, next) {    
  time.mergeEvents(req.body.room, req.body.events, req.body.googleId)  
  res.send('operation completed successfully')
});

// get Day for user 
router.get('/get-day', function(req, res, next) {       
  let currentDate = time.getCurrentDate();
  Day.find({ googleId: req.body.googleId, date: currentDate }, function(err, events) {
    if(err) console.log(err)
    res.send( events );
  })
});

// delete events 
router.delete('/delete-events', function (req, res, next) {   
  Events.deleteMany({ googleId: req.body.googleId }, function(err, events) {
    if(err) console.log('Error deleting data from mongo');
    res.send( events );  
  });
});

// delete event model in database
router.delete('/delete-day', function(req, res, next) {     
  let currentDate = time.getCurrentDate();
  Day.deleteMany({ googleId: req.body.googleId, date: currentDate }, function(err, result) {            
    if(err) console.log(err) 
    res.send( result );  
  })
});

// insert a new event in database
router.put('/put-event', function(req, res) {
  const id = req.body.event;
  new Events({
    googleId: id.googleId,
    title: id.title,
    date: id.date,
    start_time: id.start_time,
    end_time: id.end_time
  }).save();  
});

module.exports = router;