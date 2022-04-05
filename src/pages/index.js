
import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  profileEditBtn,
  elementAddBtn,
  settings,
  initialCards
} from '../utils/constants.js';


const formValidators = {};


const enableValidations = (config) => {  
  const formList = Array.from(document.querySelectorAll(config.formSelector));  
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');   
    formValidators[formName] = validator;    
   validator.enableValidation();
  });
};

enableValidations(settings);

const userInfo = new UserInfo('.profile__title','.profile__subtitle');

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const cardList = new Section({  
  items: initialCards,
  renderer: (cardSet) => {
    const card = new Card(cardSet, '#element', popupImage.open.bind(popupImage));
    return card.generateCard();
  }  
}, '.elements');

const handleFormSubmitProfile = (data) =>{   
  userInfo.setUserInfo(data);
  profilePopup.close();
};

const handleFormSubmitElem = (data) => {  
  cardList.addItem(data);
  popupElement.close();
};

const profilePopup = new PopupWithForm('.popup_type_profile', handleFormSubmitProfile, formValidators.profile.resetValidation.bind(formValidators.profile));
profilePopup.setEventListeners();

const popupElement = new PopupWithForm('.popup_type_element', handleFormSubmitElem, formValidators.element.resetValidation.bind(formValidators.element));
popupElement.setEventListeners();

profileEditBtn.addEventListener('click', profilePopup.open.bind(profilePopup));
elementAddBtn.addEventListener('click', popupElement.open.bind(popupElement));

cardList.renderItems();