import "./App.css";

import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Footer from "../Footer/Footer.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import NotFound from "../NotFound/NotFound.js";

import mainApi from "../../utils/MainApi.js";

import { CurrentUserContextProvider } from "../../contexts/CurrentUserContext.js";
import { CurrentSavedMoviesContextProvider } from "../../contexts/CurrentSavedMoviesContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  React.useEffect(() => {
    getSavedMovies();
  }, [isLoggedIn]);

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

  function handleRegisterSubmit(email, password, name) {
    setIsLoading(true);
    mainApi
      .register({ email, password, name })
      .then((data) => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLoginSubmit(email, password) {
    setIsLoading(true);
    mainApi
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogoutSubmit() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    navigate("/");
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    setIsLoading(true);

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
        setIsLoading(false);
      });
  }

  // console.log(currentUser);

  // console.log(savedMovies);

  // Проверка изменений токена при смене пользователя (done)
  // console.log(localStorage.token);

  // console.log(localStorage);

  // console.log(isLoggedIn);

  return (
    <div className="App">
      <div className="page">
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
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Movies isLoggedIn={isLoggedIn} />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <SavedMovies
                      isLoggedIn={isLoggedIn}
                      isLoading={isLoading}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Profile onLogout={handleLogoutSubmit} />
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    onSubmit={handleRegisterSubmit}
                    onTokenCheck={handleTokenCheck}
                    onLoading={isLoading}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  !isLoggedIn ? (
                    <Login
                      onSubmit={handleLoginSubmit}
                      onTokenCheck={handleTokenCheck}
                      onLoading={isLoading}
                    />
                  ) : (
                    <Navigate to="/movies" />
                  )
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CurrentSavedMoviesContextProvider>
        </CurrentUserContextProvider>
      </div>
    </div>
  );
}

export default App;
