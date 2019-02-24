import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SongList extends Component {
  render() {
    return (
      <div id="song-list">
        {this.props.songs &&
          this.props.songs.map(song => <p>{song.trackName}</p>)}
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
