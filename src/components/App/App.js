// import logo from './logo.svg';
import "./App.css";

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import Profile from "../Profile/Profile.js";
import Footer from "../Footer/Footer.js";

import moviesDataBase from "../../utils/moviesDataBase.js";

function App() {
  const moviesList = moviesDataBase;
  const location = useLocation();

  let isLoggedIn;
  location.pathname === "/" ? (isLoggedIn = false) : (isLoggedIn = true);

  return (
    <div className="App">
      <div className="page">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies moviesList={moviesList} />} />
          <Route
            path="/saved-movies"
            element={<Movies moviesList={moviesList} />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
