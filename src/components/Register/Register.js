import "./Register.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import mainApi from "../../utils/MainApi.js";

import useFormValidation from "../../hooks/useFormValidation.js";

import AuthForm from "../AuthForm/AuthForm.js";

function Register({ handleSetIsLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const { values, errors, isValid, handleChange, setValue, formRef } =
    useFormValidation();

  useEffect(() => {
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  useEffect(() => {
    setErrMessage("");
  }, [values]);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password, name } = values;
    if (!email || !password || !name) {
      setErrMessage("Заполните форму регистрации");
      return;
    }

    if (isValid) {
      setIsLoading(true);
      mainApi
        .register({ email, password, name })
        .then(() => {
          return mainApi.authorize({ email, password });
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
          setErrMessage("");
          handleSetIsLoggedIn(true);
          navigate("/movies");
        })
        .catch((err) => {
          if (err === "Ошибка 409") {
            setErrMessage("Пользователь уже зарегистрирован");
          } else {
            setErrMessage(err);
          }
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <AuthForm
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      buttonTextOnLoading="Регистрация"
      formBottomText="Уже зарегистрированы?"
      linkText="Войти"
      link="/signin"
      handleSubmit={handleSubmit}
      onLoading={isLoading}
      isValid={isValid}
      errMessage={errMessage}
      ref={formRef}
    >
      <label className="auth-form__label">
        Имя
        <input
          type="name"
          name="name"
          onChange={handleChange}
          value={values["name"] ?? ""}
          minLength="2"
          maxLength="30"
          required
          className="auth-form__input"
        ></input>
        <span className="auth-form__input-error">{errors.name}</span>
      </label>
      <label className="auth-form__label">
        E-mail
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={values["email"] ?? ""}
          required
          className="auth-form__input"
        ></input>
        <span className="auth-form__input-error">{errors.email}</span>
      </label>
      <label className="auth-form__label">
        Пароль
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={values["password"] ?? ""}
          minLength="6"
          maxLength="15"
          required
          className="auth-form__input"
        ></input>
        <span className="auth-form__input-error">{errors.password}</span>
      </label>
    </AuthForm>
  );
}

export default Register;
