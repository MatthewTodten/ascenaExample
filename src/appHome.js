const axios = require('axios'); 
const qs = require('qs');

const payloads = require('./payloads')

const apiUrl = 'https://slack.com/api';

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', './payloads.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

const displayHome = async(user) => {
  
  const argsCheck = {
    token: process.env.SLACK_ACCESS_TOKEN,
    user: user
  };
  
  //Admin credentials and home page view
  const argsAdmin = {
    token: process.env.SLACK_ACCESS_TOKEN,
    user_id: user,
    view: await payloads.updateAdminView(user)    
  };
  
  //User credentials and home page view
  const argsUser = {
    token: process.env.SLACK_ACCESS_TOKEN,
    user_id: user,
    view: await payloads.updateUserView(user)   
  }

  const info = await axios.post(`${apiUrl}/users.info`, qs.stringify(argsCheck));
  const adminStatus = info.data.user.is_admin;
  
  //If user is admin, load admin homepage view
  if(adminStatus == true){
      const result = await axios.post(`${apiUrl}/views.publish`, qs.stringify(argsAdmin));

      try {
        if(result.data.error) {
          console.log(result.data.error);
        }
      } catch(e) {
        console.log(e);
      }    
    }
  
  //If user is not admin, load user homepage view
  if(adminStatus == false){
      const result = await axios.post(`${apiUrl}/views.publish`, qs.stringify(argsUser));

      try {
        if(result.data.error) {
          console.log(result.data.error);
        }
      } catch(e) {
        console.log(e);
      }
    }

};

//Edits current problem ID
//Todo: Finish, currently nonfunctioning
//Look into JSON database creation/manipulation
const editHome = async(action) => {
  const value = action.value;
  console.log(value);
  
   loadJSON(function(response) {
  // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    console.log(actual_JSON);
 });
    
}

module.exports = { displayHome, editHome };