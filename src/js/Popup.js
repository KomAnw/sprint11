export class Popup{
	constructor(obj, container, userInfo, validatorCallback, cardInfoCreate){
		this.title = obj.title;
		this.firstPlaceHolder = obj.firstPlaceHolder;
		this.secondPlaceHolder = obj.secondPlaceHolder;
		this.button = obj.button;
		this.clss = obj.clss;
		this.buttonClass = obj.buttonClass;
		this.container = container;
		this.firstPlaceHolderId = obj.firstPlaceHolderId;
		this.firstSpanId = obj.firstSpanId;
		this.secondPlaceHolderId = obj.secondPlaceHolderId;
		this.secondSpanId = obj.secondSpanId;
		this.validatorCallback = validatorCallback;
		this.userInfo = userInfo;
		this.popup = null;
		this.cardInfoCreate = cardInfoCreate;
	}
	template(){
		const markup = `
		<div class="popup ${this.clss}">
      	<div class="popup__content">
	        <img src="./images/close.svg" alt="" class="popup__close" name="pop">
	        <h3 class="popup__title">${this.title}</h3>
	        <form class="popup__form" name="new">
	            <input id="${this.firstPlaceHolderId}" type="text" name="cardName" class="popup__input popup__input_type_name" placeholder="${this.firstPlaceHolder}" required minlength="2" maxlength="30">
	            <span id="${this.firstSpanId}" class="error"></span>
	            <input id="${this.secondPlaceHolderId}" type="url" name="cardLink" class="popup__input popup__input_type_link-url" placeholder="${this.secondPlaceHolder}" required minlength="2">
	            <span id="${this.secondSpanId}" class="error"></span>
	            <button type class="button ${this.buttonClass}" disabled onclick="event.preventDefault()">${this.button}</button>
        		</form>
      	</div>
    	</div>`;
    	const elem = document.createElement('div');
    	elem.insertAdjacentHTML('beforeend', markup.trim());
    	return elem.firstChild;
	}
	render = () =>{
		this.popup = this.template();
		this.container.append(this.popup);
		this.open(this.popup);
	}
	open = () =>{
		this.popup.classList.add('popup_is-opened');
		this.addEventListener();
		if(this.popup.classList.contains('popup_edit_profile')){
			this.userInfo(this.popup, this.close)
		}
		this.validatorCallback(this.popup);
	}
	close = () =>{
		this.popup.remove();
		this.closeEventListener();
	}

	submit = () =>{
		if(this.button === '+'){
			this.cardInfoCreate(this.popup)
			this.close()
		}
		
	}
	addEventListener = () =>{
		this.popup.querySelector('.popup__close').addEventListener('click', this.close);
		this.popup.querySelector('button').addEventListener('click', this.submit);
	}
	closeEventListener = () =>{
		this.popup.querySelector('.popup__close').removeEventListener('click', this.close);
		this.popup.querySelector('button').removeEventListener('click', this.submit);
	}
}