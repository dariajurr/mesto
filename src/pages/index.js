import {
  profileEditBtn,
  elementAddBtn,
  avatarEditBtn,
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


const createCard = (cardSet, myID) => { 
  const card = new Card(cardSet, myID, '#element', popupImage.open.bind(popupImage), popupDelete.open.bind(popupDelete), api.setLike.bind(api), api.deleteLike.bind(api)); 
  
  return card.generateCard(); 
}; 


const cardList = new Section({renderer: createCard}, '.elements');


Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([res, data]) => {     
    userInfo.setUserInfo(res);
    userInfo.setAvatar(res);    
    cardList.renderItems(data, res._id);    
  })
  .catch(console.log);

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

const handleFormSubmitProfile = (data, btn) =>{  
  btn.textContent = 'Сохранение...';
  api.setProfileInfo(data)
  .then(res => {    
    userInfo.setUserInfo(res);
    profilePopup.close();
    })
    .catch(console.log)
    .finally(() => {
      btn.textContent = 'Сохранить';
    });
};

const handleFormSubmitElem = (data, btn) => {  
  btn.textContent = 'Сохранение...'; 
  api.setCard(data)
    .then(res=> {      
      cardList.addItem(createCard(res, res.owner._id));
      popupElement.close();
    })
    .catch(console.log)
    .finally(() => {
      btn.textContent = 'Создать';
    });
};

const handleFormSubmitAvatar = (data, btn) => {
  btn.textContent = 'Сохранение...';
  api.changeAvatar(data.avatar)
  .then(res=>{
    userInfo.setAvatar(res);
    popupAvatar.close();
  })
  .catch(console.log)
  .finally(() => {
    btn.textContent = 'Сохранить';
  });   
 
};

const handleFormDelete = (elemID, elementDOM, element) => { 
  api.deleteCard(elemID); 
  popupDelete.close();
  element.removeElement(elementDOM);  
};

const profilePopup = new PopupWithForm('.popup_type_profile', handleFormSubmitProfile, formValidators.profile.resetValidation);
profilePopup.setEventListeners();


const popupElement = new PopupWithForm('.popup_type_element', handleFormSubmitElem, formValidators.element.resetValidation);
popupElement.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_avatar', handleFormSubmitAvatar, formValidators.avatar.resetValidation);
popupAvatar.setEventListeners();

const popupDelete = new PopupWithConfirm('.popup_type_delete', handleFormDelete);
popupDelete.setEventListeners();


profileEditBtn.addEventListener('click', () => { 
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
});

elementAddBtn.addEventListener('click', popupElement.open.bind(popupElement));

avatarEditBtn.addEventListener('click', popupAvatar.open.bind(popupAvatar));



