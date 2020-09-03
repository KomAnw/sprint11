import '../pages/index.css';
import {Api} from './Api.js';
import {Card} from './Card.js';
import {CardInfo} from './CardInfo.js';
import {CardList} from './CardList.js';
import {FormValidator} from './FormValidator.js';
import {ImgPopup} from './ImgPopup.js';
import {Popup} from './Popup.js';
import {UserInfo} from './UserInfo.js';

(function(){
	const NewCardObj ={
		name: null,
		link: null,
	}
	const errorMessages = {
		    empty: 'Это обязательное поле',
		    wrongLength: 'Должно быть от 2 до 30 символов',
		    url: 'Здесь должна быть ссылка',
	  	}
	const placesList = document.querySelector('.places-list');
	const popupImgContainer = document.querySelector('.popup-img');
	const rootContainer = document.querySelector('.root');
	const buttonCreateCardOpen = document.querySelector('.user-info__button');
	const buttonEditProfileOpen = document.querySelector('.user-info__edit');
	let nameUser = document.querySelector('.user-info__name');
	let aboutUser = document.querySelector('.user-info__job');
	const template = document.querySelector('#card').content.querySelector('.place-card');

	const server = NODE_ENV === 'development' ? 'https://nomoreparties.co' : 'https://nomoreparties.co';

	const api = new Api({
		url: `${server}/cohort11`,
		headers: {
			authorization: 'e5cf0ae6-c049-4812-8bb5-267f014b9213',
			'Content-Type': 'application/json'
		}
	});
	api.getUserInfo()
		.then(info=>setUserInfoCallback(info))
		.catch(err=>console.log(err))

	const cardList = new CardList(placesList, renderCard, api);

	function renderCard(item){
		const card = new Card(item, openImgfunc, template);
		return card.create(item);
	}

	function openImgfunc(link){
		const image = new ImgPopup(popupImgContainer, link);
		image.openPop();
	}

	function cardInfoCreate(popup){
		const newCard = new CardInfo(NewCardObj, popup);
		const obj = newCard.saveCardData();
		cardList.addCard(renderCard(obj));
	}

	function setUserInfoCallback(...dataObject){
		dataObject.forEach(item=>{
			nameUser.textContent = item.name
			aboutUser.textContent = item.about
		})
	}

	function updateUserInfoCallback(popup, name, about){
		
	}

	function userInfo(popup, closePopup){
        const popupUser = new UserInfo(popup, closePopup, nameUser, aboutUser, api);
        popupUser.setUserInfo();
        popupUser.addEventListener();
    }

	function validatorCallback(popup){
		const formValidator = new FormValidator(popup, errorMessages);
		formValidator.setEventListeners();
		formValidator.setSubmitButtonStateOnOpening();
	}

	buttonCreateCardOpen.addEventListener('click', function(){
		const popupData = {
			title: 'Новое место',
			firstPlaceHolder: 'Название',
			secondPlaceHolder: `Ссылка на картинку`,
			button: '+',
			buttonClass: 'popup__button',
			clss: 'popup_add_new_card',
			firstPlaceHolderId: 'name',
			firstSpanId: 'name-error',
			secondPlaceHolderId: 'url',
			secondSpanId: 'url-error',
		}
		const popup = new Popup(popupData, rootContainer, userInfo, validatorCallback, cardInfoCreate);
		popup.render();
	})
	buttonEditProfileOpen.addEventListener('click', function(){
		const popupData = {
			title: 'Редактировать профиль',
			firstPlaceHolder: 'Имя',
			secondPlaceHolder: `О себе`,
			button: 'Сохранить',
			buttonClass: 'popup__button popup__button_save',
			clss: 'popup_edit_profile',
			firstPlaceHolderId: 'user-name',
			firstSpanId: 'user-name-error',
			secondPlaceHolderId: 'about',
			secondSpanId: 'about-error',
		}
		const popup = new Popup(popupData, rootContainer, userInfo, validatorCallback);
		popup.render();
	})
})();
import { from } from 'core-js/fn/array';
