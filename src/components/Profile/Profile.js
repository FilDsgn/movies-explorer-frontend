import "./Profile.css";

import { useState, useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Profile({ onLogout }) {
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  function toggleProfileButtons() {
    setIsProfileEdit(!isProfileEdit);
  }

  const currentUser = useContext(CurrentUserContext);

  return (
    <form className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      <label className="profile__label">
        Имя
        <input
          type="name"
          minLength="2"
          maxLength="30"
          required
          defaultValue={currentUser.name}
          className="profile__input"
        ></input>
      </label>
      <label className="profile__label">
        E-mail
        <input
          type="email"
          minLength="2"
          maxLength="30"
          required
          defaultValue={currentUser.email}
          className="profile__input"
        ></input>
      </label>

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
        onClick={onLogout}
        className={`profile__button profile__button_type_logout ${
          isProfileEdit && "profile__button_hidden"
        }`}
      >
        Выйти из аккаунта
      </button>

      <span
        className={`profile__error-text ${
          !isProfileEdit && "profile__error-text_hidden"
        }`}
      >
        При обновлении профиля произошла ошибка.
      </span>
      <button
        type="button"
        onClick={toggleProfileButtons}
        className={`profile__button profile__button_type_save ${
          !isProfileEdit && "profile__button_hidden"
        }`}
      >
        Сохранить
      </button>
    </form>
  );
}

export default Profile;
