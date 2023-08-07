import "./Login.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import mainApi from "../../utils/MainApi.js";

import useFormValidation from "../../hooks/useFormValidation.js";

import AuthForm from "../AuthForm/AuthForm.js";

import { PATTERN_EMAIL } from "../../utils/constants.js";

function Login({ handleSetIsLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const { values, errors, isValid, handleChange, setValue, formRef } =
    useFormValidation();

  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  useEffect(() => {
    setErrMessage("");
  }, [values]);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;

    // if (!email || !password) {
    //   setErrMessage("Заполните форму авторизации");
    //   return;
    // }

    if (isValid) {
      setIsLoading(true);
      mainApi
        .authorize({ email, password })
        .then((data) => {
          if (data.token) {
            setErrMessage("");
            localStorage.setItem("token", data.token);
            handleSetIsLoggedIn(true);
            navigate("/movies");
          }
        })
        .catch((err) => {
          if (err === "Ошибка 401") {
            setErrMessage("Неправильная почта или пароль");
          } else {
            setErrMessage(err);
          }
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <AuthForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      buttonTextOnLoading="Вхожу"
      formBottomText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      link="/signup"
      handleSubmit={handleSubmit}
      onLoading={isLoading}
      isValid={isValid}
      errMessage={errMessage}
      ref={formRef}
    >
      <label className="auth-form__label">
        E-mail
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={values["email"] ?? ""}
          required
          className="auth-form__input"
          pattern={PATTERN_EMAIL}
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

export default Login;
