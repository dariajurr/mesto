class FormValidator {
  constructor(data, formElement) {
    this.input = data.input;
    this.btn = data.btn;
    this.btnInactive = data.btnInactive;
    this.inputTypeError = data.inputTypeError;
    this.inputErrorActive = data.inputErrorActive;
    this.formElement = formElement;
    this.inputList = Array.from(this.formElement.querySelectorAll(this.input)); 
    this.buttonElement = this.formElement.querySelector(this.btn);    
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {  
    if (this._hasInvalidInput()) {
      this.buttonElement.classList.add(this.btnInactive);
      this.buttonElement.disabled = true;
    } else {    
      this.buttonElement.classList.remove(this.btnInactive);
      this.buttonElement.disabled = false;
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.inputErrorActive);
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputTypeError);
    errorElement.classList.remove(this.inputErrorActive);
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
    this.inputList.forEach((inputElement) => {    
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });    
    });
  }

  resetValidation() {
    this._toggleButtonState(); 
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {      
      this.formElement.addEventListener('submit', (evt) => {      
        evt.preventDefault();  
        //this._toggleButtonState();   
      });    

      this._setEventListeners();
    
  }
}

export default FormValidator;

    


