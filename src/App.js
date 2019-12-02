import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar.js';
import UploadFiles from './components/uploadFiles.js';
import Search from './components/search.js';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" render={() =>
            <div>
              <Navbar/>
              <Search/>
            </div>
        }/>
      <Route exact path="/fichiers" render={() =>
            <div>
              <Navbar/>
              <UploadFiles/>
            </div>
        }/>
      </div>
    </Router>
  );
}

export default App;
