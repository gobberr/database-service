const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/database-service');
const time = require('../public/javascripts/time-service');

const Events = require('../models/event-model');
const Day = require('../models/day-model');
const Token = require('../models/token-model');

//----------------------------------------------------------------------------------------

router.get('/', function(req, res, next) {      
  res.send('Listening for request...')
});

// get Events for user TESTED
router.get('/get-events', function(req, res, next) {  
  Events.find( { googleId: req.body.googleId } , function(err, events) {      
    if(err) console.log('Error retrieving data from mongo');    
    res.send( events );  
  });
});


// get Events for user TESTED
router.get('/get-merge-events', function(req, res, next) {    
  time.mergeEvents(req.body.room, req.body.events, req.body.googleId)  
  res.send('200')
});

// get Token by id for user  TESTED
router.get('/get-event-by-id', function(req, res, next) {         
  const id = req.body.event;  
  Events.findOne({
    googleId: id.googleId,
    title: id.title,
    date: id.date,
    start_time: id.start_time,
    end_time: id.end_time
  }).then((currentEvent) => {     
    res.send(currentEvent)  
    //console.log('200')     
  }).catch((err) => {    
    //res.send(err)    
    console.log('500 on get-event-by-id')  
  });
});


// get Day for user TESTED
router.get('/get-day', function(req, res, next) {       
  let currentDate = time.getCurrentDate();
  Day.find({ googleId: req.body.googleId, date: currentDate }, function(err, events) {
    if(err) console.log(err)
    res.send( events );
  })
});

// get Token by id for user  TESTED 
router.get('/get-token', function(req, res, next) {       
  
  Token.findOne({
    googleId: req.body.googleId
  }).then((currentToken) => {     
    res.send(currentToken)    
  }).catch((err) => {    
    console.log('500:' + err)    
  });
});

// delete events TESTED
router.delete('/delete-events', function (req, res, next) {   
  Events.deleteMany({ googleId: req.body.googleId }, function(err, events) {
    if(err) console.log('Error deleting data from mongo');
    res.send( events );  
  });
});

// TESTED
router.delete('/delete-day', function(req, res, next) {     
  let currentDate = time.getCurrentDate();
  Day.deleteMany({ googleId: req.body.googleId, date: currentDate }, function(err, result) {            
    if(err) console.log(err) 
    res.send( result );  
  })
});

// TESTED
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