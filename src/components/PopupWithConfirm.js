import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup{
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);    
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');    
    
  }

  open(elementID, elementDOM, element) {
    this._elementID = elementID;
    this._elementDOM = elementDOM;
    this._element = element;

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._elementID, this._elementDOM, this._element);
    });
  }
}