import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      status:''
    }
  }

  search (term) {
    this.setState({status: ''});
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: { username: term },
      success: (data) => {
        if (typeof data === 'string') {
          this.setState({status: data});
          this.setState({repos: []});
        } else {
          this.setState({repos: data});
        }
      },
      error: (data) => {
        console.error('Error in search request');
      }
    });
  }

  componentDidMount() {
    $.get('/repos', (repos) => {
      this.setState({repos: repos});
    })
  }

  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <div>{this.state.status}</div>
      <RepoList repos={this.state.repos}/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));