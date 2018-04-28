import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';

import {getTest} from '../actions';

import {LogoutButton} from '.';

class App extends Component {
  render() {
      console.log(this.props)
      const {getTest} = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <LogoutButton/>
          <button onClick={getTest}>test</button>
      </div>
    );
  }
}

function mapStateToProps({isFetching, test}, ownProps) {
    return {
        isFetching,
        test,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getTest: () => dispatch(getTest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
