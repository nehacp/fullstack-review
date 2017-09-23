const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const Promise = require('bluebird');
const db = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// app.get('/', (req, res) => {
// 	//need to send top 25 repos
// })

app.post('/repos', function (req, res) {
 
  let foundUser = db.findUser(req.body, (err, userInfo) => {
    if (err) {
      console.log('error finding user', err)
    } else { 
      if (!userInfo.length) {
        github.getReposByUsername(req.body.username, (err, githubResponse) => {
          let repos = Array.from(JSON.parse(githubResponse.body));  
          let parsedRepos = github.parseRepos(repos);
          res.send(parsedRepos);
          //add repos to database
          db.saveRepos(parsedRepos, (err, data) => {
            console.log('Added Repos');
          });
          //add user to database
          let user = repos[0].owner;
          db.addUser({name: user.login, id: user.id}, (err, user) => {
            console.log('User added', user, 'Error adding user', err);
          });
        });
      } else {
        
      }
    }
  })  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

