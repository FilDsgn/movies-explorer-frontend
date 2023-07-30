import "./App.css";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Footer from "../Footer/Footer.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import NotFound from "../NotFound/NotFound.js";
import Preloader from "../Preloader/Preloader";

import mainApi from "../../utils/MainApi.js";

import { CurrentUserContextProvider } from "../../contexts/CurrentUserContext.js";
import { CurrentSavedMoviesContextProvider } from "../../contexts/CurrentSavedMoviesContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTokenCheck, setIstokenCheck] = React.useState(false);

  React.useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  React.useEffect(() => {
    getSavedMovies();
  }, [isLoggedIn]);

  function handleSetIsLoggedIn(boolean) {
    setIsLoggedIn(boolean);
  }

  function getSavedMovies() {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    setIsLoading(true);
    mainApi
      .getSavedMovies(token)
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("token");

    if (!token) {
      setIstokenCheck(true);
      return;
    }

    mainApi
      .getContent(token)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIstokenCheck(true);
      });
  }

  return (
    <div className="App">
      <div className="page">
        {isTokenCheck ? (
          <CurrentUserContextProvider context={{ currentUser, setCurrentUser }}>
            <CurrentSavedMoviesContextProvider
              context={{ savedMovies, setSavedMovies }}
            >
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
                    isLoggedIn ? (
                      <>
                        <Header isLoggedIn={isLoggedIn} />
                        <Movies isLoggedIn={isLoggedIn} />
                        <Footer />
                      </>
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/saved-movies"
                  element={
                    isLoggedIn ? (
                      <>
                        <Header isLoggedIn={isLoggedIn} />
                        <SavedMovies
                          isLoggedIn={isLoggedIn}
                          isLoading={isLoading}
                        />
                        <Footer />
                      </>
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/profile"
                  element={
                    isLoggedIn ? (
                      <>
                        <Header isLoggedIn={isLoggedIn} />
                        <Profile handleSetIsLoggedIn={handleSetIsLoggedIn} />
                      </>
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />

                <Route
                  path="/signup"
                  element={
                    !isLoggedIn ? (
                      <Register handleSetIsLoggedIn={handleSetIsLoggedIn} />
                    ) : (
                      <Navigate to="/movies" />
                    )
                  }
                />
                <Route
                  path="/signin"
                  element={
                    !isLoggedIn ? (
                      <Login handleSetIsLoggedIn={handleSetIsLoggedIn} />
                    ) : (
                      <Navigate to="/movies" />
                    )
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CurrentSavedMoviesContextProvider>
          </CurrentUserContextProvider>
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  );
}

export default App;
