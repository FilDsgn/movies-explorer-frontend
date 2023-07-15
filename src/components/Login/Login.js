import "./Login.css";

import AuthForm from "../AuthForm/AuthForm.js";

function Login() {
  return (
    <AuthForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      formBottomText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      link="/signup"
    >
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

export default Login;
