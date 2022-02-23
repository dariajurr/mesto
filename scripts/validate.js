const settings = {
  input : '.popup__input',
  btn: '.popup__btn',
  btnInactive:'popup__btn_inactive',
  inputTypeError: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active'
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, settings) => {  
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.btnInactive);
    buttonElement.disabled = true;
  } else {    
    buttonElement.classList.remove(settings.btnInactive);
    buttonElement.disabled = false;
  }
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorActive);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputTypeError);
  errorElement.classList.remove(settings.inputErrorActive);
  errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, inputList, buttonElement, settings) => { 
  toggleButtonState(inputList, buttonElement, settings); 
  inputList.forEach((inputElement) => {    
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });    
  });
};

const enableValidation = (settings) => {  
  const formList = Array.from(document.forms);  
  
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.input)); 
    const buttonElement = formElement.querySelector(settings.btn);    
    formElement.addEventListener('submit', (evt) => {      
      evt.preventDefault();  
      toggleButtonState(inputList, buttonElement, settings);   
    });    
    setEventListeners(formElement, inputList, buttonElement, settings);
  });
};

enableValidation(settings);