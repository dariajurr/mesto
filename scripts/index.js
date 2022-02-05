const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = document.querySelector('form[name="profile-info"]');
const nameInput = document.querySelector('.popup__input_val_name');
const jobInput = document.querySelector('.popup__input_val_job');
const elementAddBtn = document.querySelector('.profile__add-btn');
const elements = document.querySelector('.elements');
const elementPopup = document.querySelector('.popup_type_element');
const elementForm = document.querySelector('form[name="element"]'); 
const elementInputName = document.querySelector('.popup__input_val_title');
const elementInputLink = document.querySelector('.popup__input_val_link');
const elementTemplate = document.querySelector('#element').content;
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = document.querySelector('.popup__img');
const imagePopupSubtitle = document.querySelector('.popup__subtitle');

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

const togglePopup = popup => {
  popup.classList.toggle('popup_opened');
};

const createCard = (element) => {
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);

  elementItem.querySelector('.element__img').src=element.link;
  elementItem.querySelector('.element__img').alt = element.name;
  elementItem.querySelector('.element__title').textContent=element.name;

  elementItem.addEventListener('click', event => {
    const target = event.target;
 
    if(target.matches('.element__icon')) {
      target.classList.toggle('element__icon-active');
    }

    if(target.matches('.element__delete')) {
      target.closest('.element').remove();
    }

    if(target.matches('.element__img')) {
      imagePopupImg.src = target.src;
      imagePopupImg.alt = target.alt;
      imagePopupSubtitle.textContent = target.alt;
      togglePopup(imagePopup);
    }
  });
  return elementItem;
};

initialCards.forEach((element) => {
  elements.prepend(createCard(element));
});

profileEditBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(profilePopup);
});

elementAddBtn.addEventListener('click', () => {
  elementInputName.value = '';
  elementInputLink.value = '';
  togglePopup(elementPopup);
});

document.body.addEventListener('click', event => {
  const target = event.target;

  if (target.matches('.popup__icon-close') || target.matches('.popup')) {
    togglePopup(target.closest('.popup'));
  }
});

profileForm.addEventListener('submit', event =>{
  event.preventDefault();
  const target = event.target;    
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(profilePopup);  
});

elementForm.addEventListener('submit', event =>{
  event.preventDefault();
  const element = {
    name: elementInputName.value, 
    link: elementInputLink.value
  };   
  elements.prepend(createCard(element));  
  togglePopup(elementPopup);  
  elementInputName.value = '';
  elementInputLink.value = '';  
});



