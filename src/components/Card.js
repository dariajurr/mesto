class Card {
  constructor(data, myID, cardSelector, handleCardClick, deletePopupOpen, setLike, deleteLike) {  
    this._name = data.name;
    this._link = data.link;
    this._likesNumber = data.likes ? data.likes.length : 0;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deletePopupOpen = deletePopupOpen;
    this._id = data._id;
    this._idOwner = data.owner._id;
    this._myId = myID;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
    this.likes = data.likes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {  
    this._likeButton.addEventListener('click', () => {
      this._likeButton.matches('.element__icon-active') ? this._removeLike() : this._addLike();
      }
    );

    this._deleteIcon.addEventListener('click', () => {      
      this._deletePopupOpen(this._id, this._element, this);      
    });

    this._element.querySelector('.element__img').addEventListener('click', this._handleCardClick);
    
  }

  _addLike() {
    this._setLike(this._id)
      .then(res => {
        this._likeButton.classList.add('element__icon-active');
        this._likes.textContent =  res.likes.length;
      });
  }

  _removeLike() {
    this._deleteLike(this._id)
      .then(res => {
        this._likeButton.classList.remove('element__icon-active');
        this._likes.textContent =  res.likes.length;
      });  
  }

  removeElement(element) {
    element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__icon'); 
    this._likes = this._element.querySelector('.element__likes'); 
    this._cardImage = this._element.querySelector('.element__img'); 
    this._deleteIcon = this._element.querySelector('.element__delete');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._likes.textContent = this._likesNumber;

    if (this._idOwner !== this._myId) {
      this._deleteIcon.remove();
    }

    this.likes.forEach(item => {
      if (item._id === this._myId) {
        this._likeButton.classList.add('element__icon-active');
      }
    });

    
    this._setEventListeners();
    
    return this._element;
  }

}

export default Card;