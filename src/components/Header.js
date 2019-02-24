import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongsFromAPI, startLoading } from '../store/songReducer';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      startDate: '',
      endDate: '',
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
    this.props.startLoading();
    this.props.searchForSongs(
      this.generateArtistSlug(this.state.artist),
      this.state.startDate,
      this.state.endDate
    );
    this.setState({
      artist: '',
      startDate: '',
      endDate: '',
    });
  }

  render() {
    return (
      <div id="header">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="artist">Search for songs by:</label>
          <input
            type="text"
            name="artist"
            value={this.state.artist}
            onChange={this.handleChange}
            pattern="[a-zA-Z0-9 ]+"
            placeholder="Red Hot Chili Peppers"
            title="Only letters (A-Z, a-z), numbers (0-9), and spaces are permitted."
            required
          />
          <span className="required">*</span>
          <br />
          <label htmlFor="startDate">From:</label>
          <input
            className="date-input"
            type="text"
            name="startDate"
            value={this.state.startDate}
            onChange={this.handleChange}
            pattern="[0-9-]+"
            placeholder="06-29-1970"
            title="Please enter a date in MM-DD-YYYY format."
          />
          <label htmlFor="endDate">To:</label>
          <input
            className="date-input"
            type="text"
            name="endDate"
            value={this.state.endDate}
            onChange={this.handleChange}
            pattern="[0-9-]+"
            placeholder="07-16-2008"
            title="Please enter a date in MM-DD-YYYY format."
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchForSongs: (artistSlug, startDate, endDate) => {
      dispatch(getSongsFromAPI(artistSlug, startDate, endDate));
    },
    startLoading: () => {
      dispatch(startLoading());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
