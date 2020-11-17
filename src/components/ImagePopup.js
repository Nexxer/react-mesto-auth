import React from 'react'

function ImagePopup({card, isOpen, onClose}) {
   return (
    <div className={`popup popup_type_photo ${isOpen && `popup_opened`}`}>
      <figure className="popup__content">
        <img className="popup__image" src={card.link} alt="Фото места" />
        <figcaption className="popup__caption">{card.name}</figcaption>
        <button className="popup__button-close popup__button-close_for_img" onClick={onClose} />
      </figure>
    </div>
  )
};

export default ImagePopup;
