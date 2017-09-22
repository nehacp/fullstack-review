const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// app.get('/', (req, res) => {
// 	//need to send top 25 repos
// })

app.post('/repos', function (req, res) {
  console.log('received request', req.body);
  //check if the user exists in the database
  	//if not make a get request to the Github database
  		//add data to database
  			//send response back to client with repos
  	//if it exists
  		github.getReposByUsername(req.body.username, (err, data) => {
  			if (err) {
  				console.log('error receiving data from github', err);
  			} else {
  				console.log('data received!!!!', data.body);
  			}
  		});
  		// send data back from database
  	res.send('received');
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

