import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SongList extends Component {
  constructor(props) {
    super(props);
    this.formatReleaseDate = this.formatReleaseDate.bind(this);
  }

  // formatReleaseDate takes a string in the format "1981-02-12T08:00:00Z"
  // and returns "02-12-1981"
  formatReleaseDate(dateStr) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(5, 7);
    const date = dateStr.slice(8, 10);

    return month + '-' + date + '-' + year;
  }

  render() {
    return (
      <div id="song-list">
        {this.props.hasSearched ? (
          this.props.songs && this.props.songs[0] ? (
            this.props.songs.map(song => (
              <div key={song.trackId}>
                <p>{song.trackName}</p>
                <img src={song.artworkUrl100} alt="Track art" />
                <p>{this.formatReleaseDate(song.releaseDate)}</p>
              </div>
            ))
          ) : (
            <p className="status-message">
              There were no songs found using the parameters you specified.
              Please check that you have spelled the artist's name correctly
              and, if you are using years to narrow down your search, please
              make sure that they are valid years.
            </p>
          )
        ) : (
          <p className="status-message">
            Please search for an artist using the above text input to return a
            list of their songs. You may also choose to specify a release year
            range to narrow down your results.
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songReducer.songs,
    hasSearched: state.songReducer.hasSearched,
  };
};

export default connect(mapStateToProps)(SongList);
