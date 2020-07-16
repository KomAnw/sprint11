export class Card{
	constructor({name, link}, openImgfunc, template){
		this.template = template
		this.name = name;
		this.link = link;
		this.openImgfunc = openImgfunc;
	}
	create = () =>{
		this.card = this.template.cloneNode(true);
		this.card.querySelector('.place-card__name').textContent = this.name;
		this.card.querySelector('.place-card__image').style.backgroundImage = `url('${this.link}')`;
		this.addEventListeners();
		return this.card;
	}
	like = () => this.card.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');

	remove = (event) =>{
		event.stopPropagation();
		this.card.remove();
		this.removeEventListeners();
	}
	openImg = () =>{
		this.openImgfunc(this.link);
	}
	addEventListeners = () =>{
		this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
		this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
		this.card.querySelector('.place-card__image').addEventListener('click', this.openImg);
	}
	removeEventListeners = () =>{
		this.card.removeEventListener('click', this.like);
		this.card.removeEventListener('click', this.remove);
		this.card.removeEventListener('click', this.openImg);
	}
}