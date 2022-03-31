import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

   setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    this._handleFormSubmit(this._getInputValues());
   });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}