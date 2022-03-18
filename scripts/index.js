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
const formList = Array.from(document.forms);

const settings = {
  input : '.popup__input',
  btn: '.popup__btn',
  btnInactive:'popup__btn_inactive',
  inputTypeError: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

profileEditBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);  
});

elementAddBtn.addEventListener('click', () => {
  elementInputName.value = '';
  elementInputLink.value = '';
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

  const card = new Card(element, '#element', openImage);
  const cardElement = card.generateCard();

  elements.prepend(cardElement);  

  closePopup(elementPopup);  
  elementInputName.value = '';
  elementInputLink.value = '';  

});

initialCards.forEach((item) => {
  const card = new Card(item, '#element', openImage);
  const cardElement = card.generateCard();

  elements.prepend(cardElement);
}); 

formList.forEach((formElement) => {  
  const forVal = new FormValidator(settings, formElement);  
  forVal.enableValidation();
});
