import "./Login.css";

import { useEffect } from "react";
import useFormValidation from "../../hooks/useFormValidation.js";

import AuthForm from "../AuthForm/AuthForm.js";

function Login({ onSubmit, onLoading }) {
  const { values, errors, isValid, handleChange, setValue, formRef } =
    useFormValidation();

  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      const { email, password } = values;

      if (!email || !password) {
        return;
      }

      onSubmit(email, password);
    }
  }

  return (
    <AuthForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      formBottomText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      link="/signup"
      handleSubmit={handleSubmit}
      onLoading={onLoading}
      isValid={isValid}
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
