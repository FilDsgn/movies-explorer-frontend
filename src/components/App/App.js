import "./App.css";

import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

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

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { CurrentSavedMoviesContextProvider } from "../../contexts/CurrentSavedMoviesContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  React.useEffect(() => {
    console.log("обновляем фильмы");
    getSavedMovies();
  }, [isLoggedIn]);

  function getSavedMovies() {
    setIsLoading(true);
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        // console.log(res);
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
      .catch((err) => {})
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
    localStorage.removeItem("token");
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
          // console.log(res);
          setCurrentUser(res);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie(newMovieData) {
    const newMovie = {
      ...newMovieData,
      image: `https://api.nomoreparties.co${newMovieData.image.url}`,
      thumbnail: `https://api.nomoreparties.co${newMovieData.image.formats.thumbnail.url}`,
      movieId: newMovieData.id,
    };

    delete newMovie.created_at;
    delete newMovie.updated_at;
    delete newMovie.id;

    mainApi
      .saveMovie(newMovie)
      .then((movie) => {
        console.log(movie);
        setSavedMovies([...savedMovies, movie]);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteMovie(movie) {
    // const isOwner = movie.owner === currentUser._id;
    // console.log(movie);
    // console.log(currentUser._id);
    // if (isOwner) {
    //   mainApi
    //     .deleteMovie(movie._id)
    //     .then(() => {
    //       setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
    //     })
    //     .catch((err) => console.log(err));
    // }

    const deleteParam =
      location.pathname === "/movies" ? movie.id : movie.movieId;

    const deleteMovie = savedMovies.find(
      (movie) => movie.movieId === deleteParam
    );

    mainApi
      .deleteMovie(deleteMovie._id)
      .then((deletedMovie) => {
        setSavedMovies(
          savedMovies.filter((movie) => movie._id !== deletedMovie._id)
        );
      })
      .catch((err) => console.log(err));
  }

  // console.log(currentUser);

  console.log(savedMovies);

  // Проверка изменений токена при смене пользователя (done)
  // console.log(localStorage.token);

  // console.log(isLoggedIn);

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
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
                    <Movies
                      isLoggedIn={isLoggedIn}
                      onSaveMovie={handleSaveMovie}
                      // savedMovies={savedMovies}
                      onDeleteMovie={handleDeleteMovie}
                    />
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
                      onSaveMovie={handleSaveMovie}
                      onDeleteMovie={handleDeleteMovie}
                      onLoading={isLoading}
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
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
