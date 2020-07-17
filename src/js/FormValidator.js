export class FormValidator{
	constructor(popup, errorMessages){
		this.popup = popup;
		this.errorMessages = errorMessages;
		this.isAllValid = null;
		this.inputs = null;
		this.input = null;
		this.button = null;
		this.errorElem = null;
	}
	handlerValidation = () =>{
		this.inputs = [...this.popup.querySelectorAll('input')];
		this.button = this.popup.querySelector('button');

		this.isAllValid = this.inputs.every(input =>this.checkInputValidity(input));
		this.setSubmitButtonState(this.button, this.isAllValid);
	}
	checkInputValidity = (input) =>{
		this.errorElem = input.parentNode.querySelector(`#${input.id}-error`);

	  	if(input.validity.valueMissing) {
		    this.errorElem.textContent = this.errorMessages.empty;
		    return false;
	  	}
		if(input.validity.tooShort || input.validity.tooLong) {
		    this.errorElem.textContent = this.errorMessages.wrongLength;
		    return false;
		}
		if(input.validity.typeMismatch && input.id === 'url'){
	  		this.errorElem.textContent = this.errorMessages.url;
      		return false
      	}
		this.clearSpanError(this.errorElem);
		return true;
	}
	setSubmitButtonState = (button, isAllValid) =>{
		if (isAllValid === true) {
	        button.removeAttribute('disabled');
	        button.classList.add(`popup__button_valid`);
	        button.classList.remove(`popup__button_invalid`);
	    } else {
	        button.toggleAttribute('disabled', true);
	        button.classList.add(`popup__button_invalid`);
	        button.classList.remove(`popup__button_valid`);
	    }
	}
	setSubmitButtonStateOnOpening = () =>{
		this.inputs = [...this.popup.querySelectorAll('input')];
		this.button = this.popup.querySelector('button');

		if(this.inputs.every(input=>(input.value))){
			this.button.removeAttribute('disabled');
			this.button.classList.add(`popup__button_valid`);
		}	
		else{
			this.button.setAttribute('disabled', true);
			this.button.classList.add(`popup__button_invalid`);
		}
	}
	clearSpanError = (span) =>{
		span.textContent = '';
	}
	setEventListeners = () =>{
		this.popup.querySelectorAll('input').forEach(input=>input.addEventListener('input', this.handlerValidation));
		this.popup.querySelector('button').addEventListener('submit', this.handlerValidation);
	}
	removeEventListeners = () =>{
		this.popup.querySelectorAll('input').forEach(input=>input.removeEventListener('input', this.handlerValidation));
		this.popup.querySelector('button').removeEventListener('click', this.handlerValidation);
	}
}