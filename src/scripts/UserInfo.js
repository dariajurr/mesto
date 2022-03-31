export default class UserInfo {
  constructor(profileName, profileJob) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    console.log({name: this._profileName.textContent, job: this._profileJob.textContent});
    return {name: this._profileName.textContent, job: this._profileJob.textContent};
  }

  setUserInfo(data) {    
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job;
  }
}