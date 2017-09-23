const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let userSchema = mongoose.Schema({
	id: {
    type: Number,
    unique: true
  },
	name: String
});

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  description: String,
  url: String,
  owner_id: Number,
  stargazers_count: Number
});


let Repo = mongoose.model('Repo', repoSchema);
let Users = mongoose.model('User', userSchema);

let saveRepos = (repos, callback = (e, d) => {}) => {
  repos.map(repo => new Repo(repo).save(callback));
}

let fetchRepos = (param, callback) => {
  if (param.owner_id) {
    Repo.find(param, callback);
  } else {
    Repo.find().sort(param.sort).limit(param.limit).exec(callback);
  }
}

let findUser = (user, callback) => {
  Users.find(user, callback);
}

let addUser = (user, callback = (e, d) => {}) => {
  new Users(user).save(callback);
}

module.exports.findUser = findUser;
module.exports.saveRepos = saveRepos;
module.exports.fetchRepos = fetchRepos;
module.exports.addUser = addUser;