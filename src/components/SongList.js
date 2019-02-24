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
        {this.props.songs &&
          this.props.songs.map(song => (
            <div key={song.trackId}>
              <p>{song.trackName}</p>
              <img src={song.artworkUrl100} alt="Track art" />
              <p>{this.formatReleaseDate(song.releaseDate)}</p>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songReducer.songs.results,
    songCount: state.songReducer.songs.resultCount,
  };
};

export default connect(mapStateToProps)(SongList);
