import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit, resetForm) {
    super(popupSelector);    
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');    
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this.submitBtn = this._popupForm.querySelector('.popup__btn');
    this._resetForm = resetForm;
  }

  _getInputValues() {    
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
    this._handleFormSubmit(this._getInputValues(), this.submitBtn); 
     
   });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {      
      input.value = data[input.name];
    });
  }


  close() {
    super.close();
    this._popupForm.reset();
    this._resetForm();
  }
}