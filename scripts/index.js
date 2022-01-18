let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');




function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}



formElement.addEventListener('submit', formSubmitHandler);

document.body.addEventListener('click', function popupToggle (event) {
  let target = event.target;

  if (target.matches('.profile__edit-btn')) {
    popup.classList.add('popup_opened');
  }

  if (target.matches('.popup__icon-close') || target === popup) {
    popup.classList.remove('popup_opened');
  }
});



