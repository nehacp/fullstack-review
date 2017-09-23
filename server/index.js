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
  // console.log('received request', req.body);
  //check if the user exists in the database

  let foundUser = db.findUser(req.body, (err, userInfo) => {
    if (err) {
      console.log('error finding user', err)
    } else { 
      if (!userInfo.length) {
        github.getReposByUsername(req.body.username, (err, data) => {
          let repos = req.body;
          //data[0].owner.id //github id
          //data[0].owner.login //name
          //render data on page
            //add user with user id in database
            //add repos to data base  
          repos.forEach(repo => {
            let info = {
              id: repo.id,
              name: repo.name,
              description: repo.description,
              url: repo.html_url,
              owner_id: repo.owner.id,
              stargazers_count: repo.stargazers_count
            }
            db.save(info, (err, data) => {
              if (err){
                console.log('error saving repo', err);
              } else {
                console.log('Success saving data', data);
              }
            });
          })
        });
      } else {
        //get repos from database
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

