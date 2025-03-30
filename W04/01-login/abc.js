const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'uMCeKXw5JUuTTusUPCx1z2hKkU4rnJTH',
    issuerBaseURL: 'https://dev-fz2xno6kdeqpedgj.us.auth0.com'
  };



const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'http://localhost:3000',
  issuerBaseURL: 'https://dev-fz2xno6kdeqpedgj.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);



// Asking AUTH for Token
var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-fz2xno6kdeqpedgj.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"Z0oRPxdBiqlgFtQrscHiLqc7SIbAYHKA","client_secret":"in2C3kUFWYa-1hjGX3sZ7EfLV4O8qDv3rBPc1FcV1kZwWngpeL67lFJimpliUZud","audience":"http://localhost:3000","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});



// Sending the TOKEN to API
const axios = require("axios");

const options = { 
  method: "GET",
  url: "http://path_to_your_api/",
  headers: { "authorization": "Bearer TOKEN" },
};

axios(options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });