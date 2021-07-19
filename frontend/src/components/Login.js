import { useState } from 'react';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  function emailChange(e) {
    setEmail(e.target.value);
  }

  function passChange(e) {
    setPass(e.target.value);
  }

  async function authorize(e) {
    e.preventDefault();
    props.onSubmit({ email, password });
  }

  return (
    <form className="auth-form" onSubmit={authorize}>
      <h4 className="auth-form__header">Вход</h4>
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
        Войти
      </button>
    </form>
  );
}

export default Login;
