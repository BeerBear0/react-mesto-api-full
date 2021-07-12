import React from 'react'
import success from '../images/Success.png'
import fail from '../images/Fail.png'


function InfoTooltip({ isOpen, onClose, isSuccess}) {

    return (
        <div className={`popup ${isOpen && 'popup__opened'}`}>
            <div className="popup__container">
                <button className="popup__close-btn" onClick={onClose} type="button" />
                <div className="popup__wrapper" >
                    <img className="popup__infostatus" src={`${ isSuccess ? success : fail }`} alt="statusLogo" />
                    <h3 className="popup__title popup__text">{`${isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}`}</h3>
                </div>
            </div>
        </div>
    )
}
 export default InfoTooltip