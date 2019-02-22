import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      startDate: '',
      endDate: '',
    };
  }

  render() {
    return (
      <div id="header">
        <h1>Header</h1>
      </div>
    );
  }
}

export default Header;
