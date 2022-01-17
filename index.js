const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var twilio = require('twilio');
const app = express();

app.get('/', jsonParser, (req, res) => { 
  console.log('req body receive from: ', req.body);
  console.log('req query recieve from: ', req.query);
  res.send('Home URL of API. Hello world...');
});

app.post('/callback', jsonParser, (req, res) => { 
  if(req.body.type == "firmwareList") {
    console.log("\nNew Firmware Available:");
  } else if(req.body.type == "upgradeScheduled") {
    console.log("\nUpgrade Scheduled");
  } else if(req.body.type == "upgradeProgress") {
    console.log("\nUpgrade Started");
  } else if(req.body.type == "upgradeFinished") {
    console.log("\nUpgrade Finished");
  } else {
    console.log("\nUnrecognized callback message");
  };
  console.log('req body receive fromt the sinch: ', req.body);
  console.log('req query recieve from sinch: ', req.query);
  res.send('Hello world return.');
});

app.post('/sms', jsonParser, (req, res) => {
  const twiml = new MessagingResponse();
  console.log('body ------------------------------------------', req.body);
  twiml.message('The Robots are coming! Head for the hills!');

  res.send(req.body);
});

app.get('/send', (req, res) => { 
  const accountSid = '';
  const authToken = '';
  var client = new twilio(accountSid, authToken);
  console.log('twillo object is', client.messages);
  debugger
  client.messages.create({
          from: 'whatsapp:+14155238886',
          body: 'Hello there!',
          to: 'whatsapp:+923408736313'
        }).then(message => {
            console.log('response', message.sid);
        });
    res.send('message send.');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Express application running on localhost:3000');
});


