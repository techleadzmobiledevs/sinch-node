const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var twilio = require('twilio');
const app = express();


app.get('/', (req, res) => { 
  console.log('req body receive fromt the sinch: ', req.body);
  console.log('req query recieve from sinch: ', req.query);
  res.send('Hello world.');
});

app.post('/sms',jsonParser, (req, res) => {
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


