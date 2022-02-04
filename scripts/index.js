const profilePopup = document.querySelector('form[name="profile-info"]').closest('.popup');
const nameInput = document.querySelector('.popup__input_val_name');
const jobInput = document.querySelector('.popup__input_val_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const elementPopup = document.querySelector('form[name="element"]').closest('.popup');
const elementInputName = document.querySelector('.popup__input_val_title');
const elementInputLink = document.querySelector('.popup__input_val_link');

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

const renderElements = (elementsArr) => {
  elementsArr.forEach(element => {
    elements.insertAdjacentHTML('afterbegin', `
      <article class="element">
        <img class="element__img" src="${element.link}" alt="${element.name}">
        <div class="element__info">
          <h2 class="element__title">${element.name}</h2>
          <button type="button" class="element__icon"></button>
        </div>
      </article>
    `);
  });
};

renderElements(initialCards);

document.body.addEventListener('submit', event => {
  event.preventDefault();

  const target = event.target;
  

  if (target.matches('[name="profile-info"]')) {    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    profilePopup.classList.remove('popup_opened');    
  }

  if (target.matches('[name="element"]')) {
    initialCards.push({name: elementInputName.value, link: elementInputLink.value});
    renderElements(initialCards);
    elementPopup.classList.remove('popup_opened');
    elementInputName.value = '';
    elementInputLink.value = '';
    console.log(initialCards);
  }
  
});

document.body.addEventListener('click', event => {
  const target = event.target;  

  if (target.matches('.profile__edit-btn')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    profilePopup.classList.add('popup_opened');
  }

  if (target.matches('.profile__add-btn')) {
    elementPopup.classList.add('popup_opened');
  }  

  if (target.matches('.popup__icon-close') || target.matches('.popup')) {    
    target.closest('.popup').classList.remove('popup_opened');
  }
});




