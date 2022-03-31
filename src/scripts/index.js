
import '../pages/index.css';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import {
  profileEditBtn,
  profileForm,
  elementAddBtn,
  elementForm,
  settings,
  initialCards
} from '../utils/constants.js';

const profileFormValidator = new FormValidator(settings, profileForm);  
const elementFormValidator = new FormValidator(settings, elementForm);  

profileFormValidator.enableValidation();
elementFormValidator.enableValidation();


const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const createCard = (cardSet) => {
  const card = new Card(cardSet, '#element', popupImage.open.bind(popupImage));
  return card.generateCard();
};

const handleFormSubmitProfile = (data) =>{ 
  const userInfo = new UserInfo('.profile__title','.profile__subtitle');
  userInfo.setUserInfo(data);
  profilePopup.close();
};

const handleFormSubmitElem = (data) => { 
  const card = new Card(data, '#element', popupImage.open.bind(popupImage));  
  const cardItem = card.generateCard(); 
  cardList.addItem(cardItem);
  popupElement.close();
};

const profilePopup = new PopupWithForm('.popup_type_profile', handleFormSubmitProfile);
profilePopup.setEventListeners();

const popupElement = new PopupWithForm('.popup_type_element', handleFormSubmitElem);
popupElement.setEventListeners();

profileEditBtn.addEventListener('click', profilePopup.open.bind(profilePopup));
elementAddBtn.addEventListener('click', popupElement.open.bind(popupElement));

const cardList = new Section({  
  items: initialCards,
  renderer: (item, selector) => {
    selector.prepend(createCard(item));
  }
}, '.elements');
cardList.renderItems();