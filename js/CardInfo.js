class CardInfo{
	constructor(obj, popup){
		this.obj = obj;
		this.popup = popup;
	}
	saveCardData = () =>{
		this.obj.name = this.popup.querySelector('input[name="cardName"]').value;
		this.obj.link = this.popup.querySelector('input[name="cardLink"]').value;
		return this.obj
	}
}