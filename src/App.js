import React, { Component } from 'react';
import logo from './logo.svg';
import Upload from './components/Upload/Upload'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='upload-app'>
        <Upload />
      </div>
    );
  }
}

export default App;
