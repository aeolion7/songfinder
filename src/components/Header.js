import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongsFromAPI } from '../store/songReducer';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      startYear: '',
      endYear: '',
    };
    this.generateArtistSlug = this.generateArtistSlug.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  generateArtistSlug(artistName) {
    return artistName.replace(/\s/g, '+');
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.searchForSongs(this.generateArtistSlug(this.state.artist));
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
          <span className="required">*</span>
          <label htmlFor="startYear">Start Year:</label>
          <input
            type="text"
            name="startYear"
            value={this.state.startYear}
            onChange={this.handleChange}
            pattern="[0-9]{4}"
            title="Please enter a 4-digit year (ex. 2001)."
          />
          <label htmlFor="endYear">End Year:</label>
          <input
            type="text"
            name="endYear"
            value={this.state.endYear}
            onChange={this.handleChange}
            pattern="[0-9]{4}"
            title="Please enter a 4-digit year (ex. 2001)."
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchForSongs: artistSlug => {
      dispatch(getSongsFromAPI(artistSlug));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
