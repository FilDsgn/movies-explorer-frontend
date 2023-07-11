import "./Register.css";

import AuthForm from "../AuthForm/AuthForm.js";

function Register() {
  return (
    <AuthForm
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      formBottomText="Уже зарегистрированы?"
      linkText="Войти"
    >
      <label className="auth-form__label">
        Имя
        <input
          type="name"
          minLength="2"
          maxLength="30"
          required
          className="auth-form__input"
        ></input>
        <span className="auth-form__input-error"></span>
      </label>
      <label className="auth-form__label">
        E-mail
        <input type="email" required className="auth-form__input"></input>
        <span className="auth-form__input-error"></span>
      </label>
      <label className="auth-form__label">
        Пароль
        <input
          type="password"
          minLength="6"
          maxLength="15"
          required
          className="auth-form__input"
        ></input>
        <span className="auth-form__input-error"></span>
      </label>
    </AuthForm>
  );
}

export default Register;
