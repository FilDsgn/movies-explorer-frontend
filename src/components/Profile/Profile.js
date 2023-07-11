import "./Profile.css";

import { useState } from "react";

function Profile() {
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  function toggleProfileButtons() {
    setIsProfileEdit(!isProfileEdit);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form">
        <label className="profile__label">
          Имя
          <input type="name" value="Виталий" className="profile__input"></input>
        </label>
        <label className="profile__label">
          E-mail
          <input
            type="email"
            value="pochta@yandex.ru"
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
    </section>
  );
}

export default Profile;
