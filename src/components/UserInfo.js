export default class UserInfo {
  constructor(profileName, profileJob, profileAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {    
    return {name: this._profileName.textContent, about: this._profileJob.textContent};
  }

  setUserInfo(data) {    
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about; 

    if (data._id) {
      this._idOwner = data._id;
    }
         
  }

  setAvatar(data) {
    this._profileAvatar.src = data.avatar;
    this._profileAvatar.alt = data.name;
  }

}