const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const Promise = require('bluebird');
const db = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());
// app.use(bodyParser.urlencoded({extended: false}));

app.post('/repos', function (req, res) {
  db.findUser({name: req.body.username}, (err, user) => {
    if (!user.length) {
      github.getReposByUsername(req.body.username, (err, response, body) => {

        //check if a user has repos
        let repos = JSON.parse(body);
        if (repos.length) {
          let parsedRepos = github.parseRepos(repos);
          res.send(parsedRepos);

          //add repos to database
          db.saveRepos(parsedRepos);

          //add user to database
          let user = repos[0].owner;
          db.addUser({name: user.login, id: user.id});
        } else {
           // if no repos, either user does not exist or has no repos
          res.send('User does not exist or no repos found');
        }
      });
    } else {
      //else fetch repos from databases from existing users
      db.fetchRepos({owner_id: user[0].id}, (err, repos) => {
        res.send(repos);
      })
    }
  })  
});

app.get('/repos', function (req, res) {
  // not sure if sort params works
  db.fetchRepos({sort: '-stargazers_count', limit: 25} , (err, repos) => {
    res.send(repos);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

