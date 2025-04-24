import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './components/Home/Home.js';
import Navbar from './components/NavBar/NavBar';
import Login from './components/Authentication/Login.jsx';
import Register from './components/Authentication/Register.jsx';
import About from './components/About/About.js';
import Footer from './components/Footer/Footer.js';
import UserDirectory from './components/Search/search.jsx';
import UserProfile from './components/Search/UserProfile.jsx'; // Ensure this component exists
// import SuccessPage from './components/SuccessPage/SuccessPage.jsx'; // Corrected spelling

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/UserDirectory" element={<UserDirectory />} />
          {/* <Route path="/success" element={<SuccessPage />} />  */}
          <Route path="/user/:id" element={<UserProfile />} /> {/* Dynamic user profile route */}
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
