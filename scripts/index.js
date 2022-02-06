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

const openPopup = popupElement => {
  popupElement.classList.add('popup_opened');
};
const closePopup = popupElement => {
  popupElement.classList.remove('popup_opened');
};

const handleLike = event => {
  event.target.classList.toggle('element__icon-active');
};

const removeElement = event => {
  event.target.closest('.element').remove();
};

const openImage = event => {
  imagePopupImg.src = event.target.src;
  imagePopupImg.alt = event.target.alt;
  imagePopupSubtitle.textContent = event.target.alt;
  openPopup(imagePopup);
};

const createCard = (element) => {
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
  const elementLikeBtn = elementItem.querySelector('.element__icon');
  const elementDelBtn = elementItem.querySelector('.element__delete');
  const elementImg = elementItem.querySelector('.element__img');
  const elementtitle = elementItem.querySelector('.element__title');
  
  elementImg.src=element.link;
  elementImg.alt = element.name;
  elementtitle.textContent=element.name;

  elementLikeBtn.addEventListener('click', handleLike);
  elementDelBtn.addEventListener('click', removeElement);
  elementImg.addEventListener('click', openImage);

  return elementItem;
};

initialCards.forEach((element) => {
  elements.prepend(createCard(element));
});

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

document.body.addEventListener('click', event => {
  const target = event.target;

  if (target.matches('.popup__icon-close') || target.matches('.popup')) {
    closePopup(target.closest('.popup'));
  }
});

profileForm.addEventListener('submit', event =>{
  event.preventDefault();
  const target = event.target;    
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
  elementInputName.value = '';
  elementInputLink.value = '';  
});



