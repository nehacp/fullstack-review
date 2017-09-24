const request = require('request');
let TOKEN = process.env.TOKEN;

if (!TOKEN) {
  const config = require('../config.js');
  TOKEN = config.TOKEN;
}

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${TOKEN}`
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

let allowAccess = (req, res, next) => {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  res.header('access-control-allow-headers', 'content-type, accept');
  res.header('access-control-max-age', 10);
  if (req.method === 'OPTIONS') {
    res.send();  
  } else {
    next();
  }
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.parseRepos = parseRepos;
module.exports.allowAccess = allowAccess;