import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      startYear: '',
      endYear: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('submit');
    this.setState({
      artist: '',
      startYear: '',
      endYear: '',
    });
  }

  render() {
    return (
      <div id="header">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            name="artist"
            value={this.state.artist}
            onChange={this.handleChange}
            pattern="[a-zA-Z0-9 ]+"
            title="Only letters (A-Z, a-z), numbers (0-9), and spaces are permitted."
            required
          />
          <label htmlFor="startYear">Start Year:</label>
          <input
            type="text"
            name="startYear"
            value={this.state.startYear}
            onChange={this.handleChange}
          />
          <label htmlFor="endYear">End Year:</label>
          <input
            type="text"
            name="endYear"
            value={this.state.endYear}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Header;
