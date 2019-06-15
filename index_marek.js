// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
const functions = require("firebase-functions");
const {dialogflow, Suggestions} = require("actions-on-google");
const admin = require("firebase-admin");
const app = dialogflow();
const superagent = require("superagent");

  // Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDi8fQb00VCbGE9_Qk8yjH3vGwScM0OfeE",
  authDomain: "tickets-sfdjsu.firebaseapp.com",
  databaseURL: "https://tickets-sfdjsu.firebaseio.com",
  projectId: "tickets-sfdjsu",
  storageBucket: "tickets-sfdjsu.appspot.com",
  messagingSenderId: "1036493867683",
  appId: "1:1036493867683:web:c326263b2bb26835"
};
// Initialize Firebase
admin.initializeApp(firebaseConfig);

const db = admin.database();

app.intent('Default Welcome Intent', conv => {
 conv.ask(`What would you like to do during your vacation.`);
 conv.ask(new Suggestions(['surfing',"beach","party","monuments", "golf"]));
});

app.intent("destination",
 (
   conv,
   { activity, weather_condition }) => {
    let act = activity;
    let weather = weather_condition;
    conv.ask(`Barcelona is greate place for ${activity}. Would you like to book a flight ticket?`);
    return conv.ask(new Suggestions(['yes','no']));  

 }
);


app.intent("activity",
 (
   conv,
   { activity }) => {
    conv.user.storage.activity = activity;
    conv.ask('What weather do you prefer? Cold or warm');
    return conv.ask(new Suggestions(['cold','warm']));  
 }
);
 

app.intent("weather",
 (
    conv,
   { weather_condition }) => {
  	conv.user.storage.weather_condition = weather_condition;
    conv.ask(`Barcelona is great place for ${conv.user.storage.activity} in ${weather_condition} weather. Would you like to book a flight ticket?`);
    return conv.ask(new Suggestions(['yes','no']));  
 }
);

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
