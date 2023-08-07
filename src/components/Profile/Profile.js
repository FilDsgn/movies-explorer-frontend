import "./Profile.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import mainApi from "../../utils/MainApi.js";

import useFormValidation from "../../hooks/useFormValidation.js";

import { useCurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useSavedMoviesContext } from "../../contexts/CurrentSavedMoviesContext.js";

import { PATTERN_EMAIL } from "../../utils/constants.js";

function Profile({ handleSetIsLoggedIn }) {
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { setSavedMovies } = useSavedMoviesContext();
  const focusedInputRef = useRef();
  const [isProfileInfoChanged, setIsProfileInfoChanged] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const navigate = useNavigate();

  const { values, errors, isValid, handleChange, setValue, formRef } =
    useFormValidation();

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("email", currentUser.email);
  }, [setValue, currentUser]);

  // useEffect(() => {
  //   setFormMessage("");
  // }, [isProfileEdit, values]);

  useEffect(() => {
    const { name, email } = values;

    if (name === currentUser.name && email === currentUser.email) {
      setIsProfileInfoChanged(false);
    } else {
      setIsProfileInfoChanged(true);
    }
  }, [values, currentUser]);

  const displayedErrorMessage = errors.name ? errors.name : errors.email;

  useEffect(() => {
    if (isProfileEdit) {
      focusedInputRef.current.focus();
    }
  }, [isProfileEdit]);

  function handleEditProfileSubmit(e) {
    e.preventDefault();
    const { name, email } = values;

    if (!name || !email) {
      return;
    }

    if (!isProfileInfoChanged) {
      return;
    }

    if (isValid) {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      mainApi
        .setUserInfo({ name, email }, token)
        .then((data) => {
          setCurrentUser(data);
          toggleProfileButtons();
          setFormMessage("Данные успешно обновлены");
          setIsErrorMessage(false);
        })
        .catch((err) => {
          if (err === "Ошибка 409") {
            setFormMessage("Такой пользователь уже существует");
            setIsErrorMessage(true);
          } else {
            setFormMessage(err);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleLogoutSubmit() {
    localStorage.clear();
    handleSetIsLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    navigate("/");
  }

  function toggleProfileButtons() {
    setFormMessage("");
    setIsProfileEdit(!isProfileEdit);
  }

  return (
    <form className="profile" ref={formRef}>
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      <label className="profile__label">
        Имя
        <input
          type="name"
          name="name"
          onChange={handleChange}
          value={values["name"] ?? ""}
          minLength="2"
          maxLength="30"
          required
          disabled={!isProfileEdit}
          ref={focusedInputRef}
          className="profile__input"
        ></input>
      </label>
      <label className="profile__label">
        E-mail
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={values["email"] ?? ""}
          minLength="2"
          maxLength="30"
          required
          disabled={!isProfileEdit}
          className="profile__input"
          pattern={PATTERN_EMAIL}
        ></input>
      </label>

      <span
        className={`profile__message ${
          isErrorMessage || !isValid ? "profile__message_type_error" : ""
        }`}
      >
        {displayedErrorMessage ? displayedErrorMessage : formMessage}
      </span>

      <button
        type="button"
        onClick={toggleProfileButtons}
        className={`profile__button profile__button_type_edit ${
          isProfileEdit && "profile__button_hidden"
        }`}
      >
        Редактировать
      </button>
      <button
        type="button"
        onClick={handleLogoutSubmit}
        className={`profile__button profile__button_type_logout ${
          isProfileEdit && "profile__button_hidden"
        }`}
      >
        Выйти из аккаунта
      </button>

      <button
        type="submit"
        disabled={isLoading}
        onClick={handleEditProfileSubmit}
        className={`profile__button profile__button_type_save ${
          !isValid || !isProfileInfoChanged || isLoading
            ? "profile__button_type_save_disabled"
            : ""
        } ${!isProfileEdit ? "profile__button_hidden" : ""}`}
      >
        {!isLoading ? "Сохранить" : "Сохранение"}
      </button>
    </form>
  );
}

export default Profile;
