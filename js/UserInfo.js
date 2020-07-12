class UserInfo{
	constructor(popup, closePopup, nameUser, aboutUser, api){
		this.popup = popup;
		this.nameUser = nameUser;
		this.aboutUser = aboutUser;
		this.api = api;
		this.closePopup = closePopup;
	}

	setUserInfo = () =>{
		this.popup.querySelector('.popup__input_type_name').value = this.nameUser.textContent;
		this.popup.querySelector('.popup__input_type_link-url').value = this.aboutUser.textContent;
	}

	handlerUserData = () =>{
		const name = this.popup.querySelector('.popup__input_type_name').value;
		const about = this.popup.querySelector('.popup__input_type_link-url').value;
		this.api.patchProfile({name , about})
			.then(res=>{
				this.nameUser.textContent = res.name;
				this.aboutUser.textContent = res.about;
				this.closePopup();
			})
			.catch(err=>console.log(err))
	}
	
	addEventListener = () =>{
		this.popup.querySelector('.button').addEventListener('click', this.handlerUserData);
	}
}