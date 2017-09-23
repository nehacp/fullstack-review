import React from 'react';

const Repo = (props) => (
  <div>
  <a href={props.repo.url}>{props.repo.name}</a>
  <div>{props.repo.description}</div>
  </div>
)

export default Repo;