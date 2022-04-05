class FormValidator {
  constructor(data, formElement) {
    this._input = data.input;
    this._btn = data.btn;
    this._btnInactive = data.btnInactive;
    this._inputTypeError = data.inputTypeError;
    this._inputErrorActive = data.inputErrorActive;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._input)); 
    this._buttonElement = this._formElement.querySelector(this._btn);    
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {      
    if (this._hasInvalidInput()) {      
      this._buttonElement.classList.add(this._btnInactive);
      this._buttonElement.disabled = true;
    } else {      
      this._buttonElement.classList.remove(this._btnInactive);
      this._buttonElement.disabled = false;
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorActive);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputTypeError);
    errorElement.classList.remove(this._inputErrorActive);
    errorElement.textContent = '';
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() { 
    this._toggleButtonState(); 
    this._inputList.forEach((inputElement) => {    
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });    
    });
  }

  resetValidation() {
    this._toggleButtonState(); 
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {      
      this._formElement.addEventListener('submit', (evt) => {      
        evt.preventDefault();          
        this._toggleButtonState();
      });    
      this._setEventListeners();
    
  }
}

export default FormValidator;

    


