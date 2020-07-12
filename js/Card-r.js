class{
  constructor(cardObject){
    this.cardObj = cardObject;
    this.title = cardObject.title;
    this.link = cardObject.url;
  }

  template = () =>{
    const markup = `
		  <div class="place-card">
        <div class="place-card__image">
          <button class="place-card__delete-icon" name="delete"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon" name="like"></button>
        </div>
      </div>`;
    	const elem = document.createElement('div');
    	elem.insertAdjacentHTML('beforeend', markup.trim());
    	return elem.firstChild;
  }

  create = () =>{
    this.card = this.template.cloneNode(true)
    this.card.querySelector('.place-card__name').textContent = this.title;
    this.card.querySelector('.place-card__image').style.backgroundImage = `url('${this.link}')`;

    return this.card;
  }

  like = () => this.card.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');

  addEventListeners = () =>{
		this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
		this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
	}
	removeEventListeners = () =>{
		this.card.removeEventListener('click', this.like);
		this.card.removeEventListener('click', this.remove);
	}
}