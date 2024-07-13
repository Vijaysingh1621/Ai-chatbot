import React from 'react';
import Homepage from './components/Homepage';
import UserPage from './userPage/UserPage';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
