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

let Repos = mongoose.model('Repo', repoSchema);

let Users = mongoose.model('User', userSchema);

// let saveRepo = (data, callback) => {
//   new Repo(data);
// }

// let fetchRepos = (userId) => {
//   Repos.find({owner_id: userId})
// }

let findUser = (user, callback) => {
  Users.find(user, (err, data) => {
    console.log('looking for user');
    if (err) {
      callback(err, null);
    } else {
      callback(null, data)
    }
  });
}

let addUser = (user, callback) => {
  console.log('added user', user);
  new Users(user).save((err, data) => {
    callback(err, data);
  });

}

module.exports.findUser = findUser;
// module.exports.saveRepo = saveRepo;
// module.exports.fetchRepos = fetchRepos;
module.exports.addUser = addUser;