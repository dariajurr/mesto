export default class Section {
  constructor({ items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    const card = this._renderer(element);
    this._container.prepend(card);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();
    this._renderedItems.forEach(item => {
      this.addItem(item);      
    });
  }
}