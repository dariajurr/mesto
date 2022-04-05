class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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
    this._element.querySelector('.element__icon').addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._removeElement();
    });

    this._element.querySelector('.element__img').addEventListener('click', this.handleCardClick);
    
  }

  _handleLike() {
    this._likeButton.classList.toggle('element__icon-active');
  }

  _removeElement() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__icon');    
    this._cardImage = this._element.querySelector('.element__img');
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();
    
    return this._element;
  }

}

export default Card;