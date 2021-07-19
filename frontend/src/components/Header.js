import { useLocation, useHistory } from 'react-router-dom';

function Header(props) {
  const path = useLocation().pathname;
  const history = useHistory();
  let btnTxt = 'Выйти';
  let to = '/';

  if (path === '/sign-up') {
    btnTxt = 'Войти';
    to = '/sign-in';
  } else if (path === '/sign-in') {
    btnTxt = 'Регистрация';
    to = '/sign-up';
  }

  function authNav() {
    if (!props.loggedIn) {
      history.push(to);
    } else {
      props.exitUser();
    }
  }

  return (
    <header className="header">
      <a href="/" target="_self" className="header__logo"/>
      <div className="header__profile">
        {props.loggedIn && <p className="header__email">{props.email}</p>}
        <button onClick={authNav} className="header__action">
          {btnTxt}
        </button>
      </div>
    </header>
  );
}

export default Header;
