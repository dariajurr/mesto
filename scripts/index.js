const profilePopup = document.querySelector('form[name="profile-info"]').closest('.popup');
const nameInput = document.querySelector('.popup__input_val_name');
const jobInput = document.querySelector('.popup__input_val_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const elementPopup = document.querySelector('form[name="element"]').closest('.popup');
const elementInputName = document.querySelector('.popup__input_val_title');
const elementInputLink = document.querySelector('.popup__input_val_link');
const elementTemplate = document.querySelector('#element').content;
const imagePopup = document.querySelector('.image-popup');
const imagePopupImg = imagePopup.querySelector('.image-popup__img');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');

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

const renderElement = (element) => {
    const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
    elementItem.querySelector('.element__img').src=element.link;
    elementItem.querySelector('.element__img').alt = element.name;
    elementItem.querySelector('.element__title').textContent=element.name;
    elements.prepend(elementItem);
};

initialCards.forEach(renderElement);

document.body.addEventListener('submit', event => {
  event.preventDefault();

  const target = event.target;

  if (target.matches('[name="profile-info"]')) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    profilePopup.classList.remove('popup_opened');
  }

  if (target.matches('[name="element"]')) {
    renderElement({name: elementInputName.value, link: elementInputLink.value});
    elementPopup.classList.remove('popup_opened');
    elementInputName.value = '';
    elementInputLink.value = '';
  }
});

document.body.addEventListener('click', event => {
  const target = event.target;

  //открытие popup редактирования профиля
  if (target.matches('.profile__edit-btn')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    profilePopup.classList.add('popup_opened');
  }

  //закрытие popup
  if (target.matches('.popup__icon-close') || target.matches('.popup')) {
    target.closest('.popup').classList.remove('popup_opened');
  }

  //like
  if(target.matches('.element__icon')) {
    target.classList.toggle('element__icon-active');
  }

  //delete
  if(target.matches('.element__delete')) {
    target.closest('.element').remove();
  }

  //открытие popup добавления фото
  if (target.matches('.profile__add-btn')) {
    elementInputName.value = '';
    elementInputLink.value = '';
    elementPopup.classList.add('popup_opened');
  }

  //открытие popup фото
  if(target.matches('.element__img')) {
    imagePopupImg.src = target.src;
    imagePopupImg.alt = target.alt;
    imagePopupTitle.textContent = target.alt;
    imagePopup.classList.add('image-popup_opened');
  }

   //закрытие popup
  if (target.matches('.image-popup__icon-close') || target.matches('.image-popup')) {
    target.closest('.image-popup').classList.remove('image-popup_opened');
  }
});




