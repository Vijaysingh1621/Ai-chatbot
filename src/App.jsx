import React from 'react';
import Homepage from './components/Homepage';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import SignInPage from './routes/sign-in';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/sign-in" element={<SignInPage/>} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
