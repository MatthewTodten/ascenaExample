require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('querystring');

const appHome = require('./appHome');
const onboard = require('./onboard');
const signature = require('./verifySignature');
const remind = require('./remind');

const apiUrl = 'https://slack.com/api';

const callAPIMethod = async (method, payload) => {
    let data = Object.assign({ token: process.env.SLACK_ACCESS_TOKEN }, payload);
    let result = await axios.post(`${apiUrl}/${method}`, qs.stringify(data));
    return result.data;
}

const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.get('/', (req, res) => {
  res.send('<h2>The Welcome/Terms of Service app is running</h2> <p>Follow the' +
    ' instructions in the README to configure the Slack App and your' +
    ' environment variables.</p>');
});


// trigger the reminder from an external source
app.get('/remind', (req, res) => {
  remind()
});



/*
 * Endpoint to receive events from Slack's Events API.
 * It handles `team_join` event callbacks.
 */
app.post('/events', (req, res) => {
  switch (req.body.type) {
    case 'url_verification': {
      // verify Events API endpoint by returning challenge if present
      res.send({ challenge: req.body.challenge });
      break;
    }
    case 'event_callback': {
      // Verify the signing secret
      if (signature.isVerified(req)) {
        const event = req.body.event;
        console.log(event);
        

        // `team_join` is fired whenever a new user (incl. a bot) joins the team
        if (event.type === 'team_join' && !event.is_bot) {
          const { team_id, id } = event.user;
          console.log(team_id);
          onboard.initialMessage(team_id, id);
        }
        
        // Display App Home
        if(event.type === 'app_home_opened') { 
                     
           const {user} = event;
           console.log(user);
          
           appHome.displayHome(user);
        };
          
        // Listens for messages, excludes messages from the bot
        if (event.type === 'message' && event.user != 'UV54VHAAC'){
          
          //converts message into lower case
          var keyConvert = event.text.toLowerCase();
          console.log(keyConvert);
                      
          
         if ((keyConvert.includes('geocode') == true || keyConvert.includes('geo code') == true) && event.user != 'UV54VHAAC'){
            const conversationId = event.channel; 
            const timestamp = event.ts;
            
            callAPIMethod('chat.postMessage', {
              channel: conversationId, 
              text: 'If you have an OrPOS store giving a "Geo Code" error, please restart OrPOS and attach PID 10866 to your incident',
              thread_ts: timestamp
            })
            return res.send('');
          }          
          
         else if (keyConvert.includes('critical error') == true && event.user != 'UV54VHAAC'){
              const conversationId = event.channel; 
              const timestamp = event.ts;

              callAPIMethod('chat.postMessage', {
                channel: conversationId, 
                text: "If you have a Critical Error for a JST email password reset, please remember to attach PID 10942. Also remember not to change the client to Light Mode, just reset the password.",
                thread_ts: timestamp
              })
              return res.send('');
          }
          
          
          
         else if ((keyConvert.includes('rbc') == true || keyConvert.includes('royal bank') == true || keyConvert.includes('canada debit') == true || keyConvert.includes('Canadian debit') == true || keyConvert.includes('canada') == true || keyConvert.includes('canadian') == true) && event.user != 'UV54VHAAC'){
              const conversationId = event.channel; 
              const timestamp = event.ts;

              callAPIMethod('chat.postMessage', {
                channel: conversationId, 
                text: "If you have a Canadian MAU or JST store reporting problems using debit cards, please attach PID 10952 to your incident.",
                thread_ts: timestamp
              })
              return res.send('');
          }           
        }

        res.sendStatus(200);
    
    } else { res.sendStatus(500); }
      break;
    }
    default: { res.sendStatus(500); }
  }
});

//Receives the usertest slash command
app.post('/usertest', async (req, res) =>{
  res.status(200).end()
  if (signature.isVerified(req)) {
    
    const {user_id} = req.body;
    console.log(user_id);
    
    const info = await callAPIMethod('users.info', {
      user: user_id
    });
    
    console.log(info.user.is_admin);
    
   }  
  
})

/*
 * Endpoint to receive events from interactive message on Slack. 
 * Verify the signing secret before continuing.
 */

app.post('/interactive', (req, res) => {
  //See if JSON.parse can be removed
  const {actions} = JSON.parse(req.body.payload);

  const action = actions[0];
  
  
  if (signature.isVerified(req)) {
    appHome.editHome(action);  
    
    res.send();
    }
 //   axios.post(response_url, { text: 'Thank you! The Terms of Service have been accepted.' });
   else { res.sendStatus(500); }
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});