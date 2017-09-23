const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  url: String,
  owner_id: Number,
  stargazers_count: Number
});

let userSchema = mongoose.Schema({
	id: Number,
	name: String
})

let Repo = mongoose.model('Repo', repoSchema);

let Users = mongoose.model('User', userSchema);

let saveRepos= (repos, callback) => {
  repos.map(repo => {
    let newRepo = new Repo(repo);
    newRepo.save(callback);
  });
}

// let fetchRepos = (userId) => {
//   Repos.find({owner_id: userId})
// }

let findUser = (user, callback) => {
  Users.find(user, callback);
}

let addUser = (user, callback) => {
  console.log('added user', user);
  new Users(user).save((err, data) => {
    callback(err, data);
  });

}

module.exports.findUser = findUser;
module.exports.saveRepos = saveRepos;
// module.exports.fetchRepos = fetchRepos;
module.exports.addUser = addUser;