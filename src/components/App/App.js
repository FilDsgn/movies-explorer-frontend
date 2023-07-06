// import logo from './logo.svg';
import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import Footer from "../Footer/Footer.js";

function App() {
  return (
    <div className="App">
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
