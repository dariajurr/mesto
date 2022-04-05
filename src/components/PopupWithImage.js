import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {    
    super(popupSelector);    
    this._imagePopupImg = this._popup.querySelector('.popup__img');
    this._imagePopupSubtitle = this._popup.querySelector('.popup__subtitle');
  }

  open(event){
    super.open();    
    this._imagePopupImg.src = event.target.src;
    this._imagePopupImg.alt = event.target.alt;
    this._imagePopupSubtitle.textContent = event.target.alt;    
  } 
}