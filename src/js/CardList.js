export class CardList {
    constructor(container, renderCard, api){
        this.container = container;
        this.renderCard = renderCard;
        this.cards = []
        this.api = api;
        this.init();
    }

    init() {
        this.api.getInitialCards()
            .then(cards=> {
                this.cards = cards;
                this.render();
            })
            .catch(err=>console.log(err))
    }

    addCard = (card) =>{
        this.container.appendChild(card);
    }

    render = () => {
        this.cards.forEach(item=>{
            this.addCard(this.renderCard(item));
        });
    }
}