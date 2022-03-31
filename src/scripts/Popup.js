export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);    
  }

  _handleEscClose(evt) {   
    if (evt.key === 'Escape') {       
      this.close();
    }      
  }

  setEventListeners() {
    this._popup.addEventListener('click', event => {      
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__icon-close')) {             
        this.close();
      }
    });
  }

  open(){        
    this._popup.classList.add('popup_opened');      
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  } 

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); 
  }
}