import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import routes from './routes'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logedIn: false
    }
  }

  authenticated(history) {
    let promise = axios.get('/auth/active_user').then(resp => {
      return resp.data;
    }).catch(err => history.push('/'))
  }
  
  render() {
    console.log( this.props.history )
      return (
        <div className="App">
          {routes}
        </div>
      );
    }
  }

  export default App;
