import { useState } from 'react';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  function emailChange(e) {
    setEmail(e.target.value);
  }

  function passChange(e) {
    setPass(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({ email, password });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h4 className="auth-form__header">Регистрация</h4>
      <input
        className="auth-form__input"
        type="email"
        value={email}
        onChange={emailChange}
        placeholder="Email"
      />
      <input
        className="auth-form__input"
        type="password"
        value={password}
        onChange={passChange}
        placeholder="Пароль"
      />
      <button className="auth-form__button" type="submit">
        Зарегистрироваться
      </button>
      <p className="auth-form__text">
        Уже зарегистрированы?{' '}
        <a className="auth-form__url" href="/signin">
          Войти
        </a>
      </p>
    </form>
  );
}

export default Register;
