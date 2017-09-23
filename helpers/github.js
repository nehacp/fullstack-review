const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, callback);

}

let parseRepos = repos => {
	return repos.map(repo => {
    let info = {
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      owner_id: repo.owner.id,
      stargazers_count: repo.stargazers_count
    }
    return info;
  });
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.parseRepos = parseRepos;