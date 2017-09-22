const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// mongoose.on('error', console.error.bind(console, 'connection error'));
// mongoose.once('open', () => {
// 	console.log('Connected to Mongoose');
// })

let repoSchema = mongoose.Schema({
  github_id: Number,
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

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;