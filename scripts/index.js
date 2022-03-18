import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = document.forms.profile;
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.job;
const elementAddBtn = document.querySelector('.profile__add-btn');
const elements = document.querySelector('.elements');
const elementPopup = document.querySelector('.popup_type_element');
const elementForm = document.forms.element; 
const elementInputName = elementForm.elements.title;
const elementInputLink = elementForm.elements.link;
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = document.querySelector('.popup__img');
const imagePopupSubtitle = document.querySelector('.popup__subtitle');
const popups = document.querySelectorAll('.popup');

const settings = {
  input : '.popup__input',
  btn: '.popup__btn',
  btnInactive:'popup__btn_inactive',
  inputTypeError: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active'
};

const profileFormValidator = new FormValidator(settings, profileForm);  
const elementFormValidator = new FormValidator(settings, elementForm);  

profileFormValidator.enableValidation();
elementFormValidator.enableValidation();

const closeByEscape = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const openPopup = popupElement => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

const closePopup = popupElement => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
};

const openImage = event => {
  imagePopupImg.src = event.target.src;
  imagePopupImg.alt = event.target.alt;
  imagePopupSubtitle.textContent = event.target.alt;
  openPopup(imagePopup);
};

const createCard = (cardSet) => {
  const card = new Card(cardSet, '#element', openImage);
  return card.generateCard();
};

initialCards.forEach((item) => {
  elements.prepend(createCard(item));
}); 

profileEditBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileFormValidator.resetValidation(); 
  openPopup(profilePopup);  
});

elementAddBtn.addEventListener('click', () => {
  elementForm.reset();
  elementFormValidator.resetValidation(); 
  openPopup(elementPopup);
});

popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__icon-close')) {      
      closePopup(popup);
    }
  });
}) ;

profileForm.addEventListener('submit', event =>{
  event.preventDefault();
 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);  
});

elementForm.addEventListener('submit', event =>{
  event.preventDefault();
  
  const element = {
    name: elementInputName.value, 
    link: elementInputLink.value
  }; 

  elements.prepend(createCard(element));  

  closePopup(elementPopup);  

  elementForm.reset();  
});