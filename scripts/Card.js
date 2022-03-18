class Card {
  constructor(data, cardSelector, openImage) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.openImage = openImage;
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

    this._element.querySelector('.element__img').addEventListener('click', this.openImage);
    
  }

  _handleLike() {
    this.elementIcon.classList.toggle('element__icon-active');
  }

  _removeElement() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this.elementIcon = this._element.querySelector('.element__icon');

    this._setEventListeners();
    
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    
    return this._element;
  }

}

export default Card;