import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
  const content = {
    ok: { img: success, txt: 'Вы успешно зарегистрировались!' },
    not: { img: error, txt: 'Что-то пошло не так! Попробуйте ещё раз.' },
  };
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container abs-center">
        <button
          aria-label="Закрыть всплывающее окно"
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <img
          className="popup__tooltip-img"
          src={content[props.status].img}
          alt={props.status}
        />
        <p className="popup__tooltip-txt">{content[props.status].txt}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
