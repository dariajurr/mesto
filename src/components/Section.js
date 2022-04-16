export default class Section {
  constructor({renderer},  containerSelector) {    
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;    
  }

  addItem(element) {    
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items, myID) {
    this.clear();
    items.forEach(item => {
      this.addItem(this._renderer(item, myID));      
    });
  }
}