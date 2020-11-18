import React from 'react';
import Success from '../image/SucReg.svg';
import Failed from './../image/FailReg.svg';

function InfoTooltip({ isOpen, onClose }) {
  return (
    <div className={`popup popup_tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <img
          alt='результат'
          className='popup__picture'
          src={isOpen.email ? Success : Failed}
        />
        <h2 className='popup__title popup__title_tooltip'>
          {isOpen.email ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        <button
          type='button'
          className='popup__button-close'
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default InfoTooltip;
