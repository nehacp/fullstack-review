import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4>Repository List</h4>
     {props.repos.map(repo => <Repo repo={repo} key={repo.id}/> )}
  </div>
)

export default RepoList;