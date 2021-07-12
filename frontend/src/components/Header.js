import React from "react";
import logo from "../images/Vector.svg";
import {Link, Route} from 'react-router-dom'

function Header({ onSignOut, email, loggedIn}) {
    const [dropDownIsOpen, setDropDownIsOpen] = React.useState('');
    const [closeMenuBtnActive, setCloseMenuBtnActive] = React.useState('');

    const handleBtnClick = () => {
        setDropDownIsOpen(!dropDownIsOpen);
        setCloseMenuBtnActive(!closeMenuBtnActive);
    }

    React.useEffect(() => {
        handleBtnClick()
    }, [])

    const layout = (
        <div className={`header__info ${closeMenuBtnActive && loggedIn ? 'header__info_type_mobile' : ''}`}>
            <p className="header__email">{email}</p>
            <button className="header__button" onClick={onSignOut} type="button">Выйти</button>
        </div>
    )

    return (
        <header className="header">
            <div className={`header__wrapper ${ dropDownIsOpen ? '' : 'header__wrapper_type_active'}`}>{layout}</div>
            <div className="header__container">
               <img src={logo} alt="Логотип Место" className="header__logo" />
                { loggedIn ? <button className={`header__dropdown ${dropDownIsOpen ? '' : 'header__dropdown_active'}`} onClick={handleBtnClick} type='button'/>: ''}
                <nav className="header__routes">

                    <Route exact path="/sign-up">
                        <Link className="header__link" to='/sign-in'>Войти</Link>
                    </Route>

                    <Route exact path="/sign-in">
                        <Link className="header__link" to='/sign-up'>Регистрация</Link>
                    </Route>

                    <Route exact path="/">
                        <div className={`header__wrapper ${ dropDownIsOpen ? 'header__wrapper_type_active' : '' }`}>
                            {layout}
                        </div>
                    </Route>
                </nav>
            </div>
        </header>
    )

}

export default Header