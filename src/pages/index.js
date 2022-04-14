
import {
  profileEditBtn,
  elementAddBtn,
  settings
} from '../utils/constants.js';

import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '30522ec8-5418-4dbd-af44-905c6477ad0f',
    'Content-Type': 'application/json'
  }
});

let cardList;


Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([res, data]) => {
    userInfo.setUserInfo(res);
    userInfo.setAvatar(res);

    cardList = new Section({  
      items: data,
      renderer: (cardSet) => {
        const card = new Card(cardSet, res._id, '#element', popupImage.open.bind(popupImage), popupDelete.open.bind(popupDelete), api.setLike.bind(api), api.deleteLike.bind(api));
        return card.generateCard();
      }  
    }, '.elements');
    cardList.renderItems();    
  });

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

const userInfo = new UserInfo('.profile__title','.profile__subtitle', '.profile__img');


const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const handleFormSubmitProfile = (data) =>{   
  api.setProfileInfo(data);
  userInfo.setUserInfo(data);
  profilePopup.close();
};

const handleFormSubmitElem = (data) => {   
  api.setCard(data)
    .then(res=> {
      cardList.addItem(res);
      popupElement.close();
    });
};

const handleFormDelete = (elemID, element) => {  
  api.deleteCard(elemID); 
  popupDelete.close();
  element.remove();  
};

const profilePopup = new PopupWithForm('.popup_type_profile', handleFormSubmitProfile, formValidators.profile.resetValidation.bind(formValidators.profile));
profilePopup.setEventListeners();


const popupElement = new PopupWithForm('.popup_type_element', handleFormSubmitElem, formValidators.element.resetValidation.bind(formValidators.element));
popupElement.setEventListeners();

const popupDelete = new PopupWithConfirm('.popup_type_delete', handleFormDelete);
popupDelete.setEventListeners();


profileEditBtn.addEventListener('click', () => { 
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
});

elementAddBtn.addEventListener('click', popupElement.open.bind(popupElement));
