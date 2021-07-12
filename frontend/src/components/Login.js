import React from "react"



function Login ({ onLogin } ) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange (evt) {
        setEmail(evt.target.value)
    }
    function handlePasswordChange (evt) {
        setPassword(evt.target.value)
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        if(!email || !password) {
            return;
        }
        onLogin(email, password)
    }
    return(
        <form className="login__container" onSubmit={handleSubmit}>
            <h3 className="popup__title login__title">Вход</h3>
            <input
                onChange={handleEmailChange}
                value={email || ''}
                className="popup__input login__input"
                type="email"
                name="email"
                placeholder="Email"
                required
            />
            <input
                onChange={handlePasswordChange}
                value={password || ''}
                className="popup__input login__input"
                type="password"
                name="password"
                placeholder="Пароль"
                required
            />
            <button
                className="popup__submit login__submit"
                type="submit">Войти</button>
        </form>
    )
}
 export default Login;