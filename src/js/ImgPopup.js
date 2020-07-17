export class ImgPopup{
	constructor(container, link){
		this.container = container;
		this.link = link;
	}
	openPop = () =>{
		this.container.classList.add('popup_is-opened');
		this.container.querySelector('.popup-img__image').src = `${this.link}`;
		this.addEventListener()
	}
	closePop = () => {
		this.container.classList.remove('popup_is-opened');
		this.removeEventListener();
	}
	addEventListener = () => this.container.querySelector('.popup-img__close').addEventListener('click', this.closePop);
	removeEventListener = () => this.container.querySelector('.popup-img__close').removeEventListener('click', this.closePop);
}