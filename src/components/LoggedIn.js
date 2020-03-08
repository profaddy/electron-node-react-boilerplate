import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoggedIn extends Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
  };

  handleLogout = () => {
    this.props.onLogout({
      username: '',
      loggedIn: false,
    })
    // this.props.history.pushState()
  };

  render() {
    return (
      <div>
        <h2>Logged in as {this.props.username}</h2>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}
