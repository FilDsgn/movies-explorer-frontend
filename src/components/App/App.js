import "./App.css";

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import Profile from "../Profile/Profile.js";
import Footer from "../Footer/Footer.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import NotFound from "../NotFound/NotFound.js";

import moviesDataBase from "../../utils/moviesDataBase.js";

function App() {
  const moviesList = moviesDataBase;
  const location = useLocation();

  let isLoggedIn;
  location.pathname === "/" ? (isLoggedIn = false) : (isLoggedIn = true);

  return (
    <div className="App">
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Movies moviesList={moviesList} />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Movies moviesList={moviesList} />
                <Footer />
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
