import React, { Component } from 'react';
import { default as Header } from './components/Header';
import SongList from './components/SongList';

class App extends Component {
  render() {
    return (
      <div id="container">
        <Header />
        <SongList />
      </div>
    );
  }
}

export default App;
