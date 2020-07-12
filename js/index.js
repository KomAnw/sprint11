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

	const api = new Api({
		url: 'https://praktikum.tk/cohort11',
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

/*
	Неплохая работа, класс Api создан, запросы на сервер выполняются. Но к организации кода есть замечания:

	Надо исправить:
	- убрать из класса Api обработчики ошибки catch и разместить их в самом конце цепочки обработки промиса,
	там где методы класса Api вызываются
	- в методе patchProfile так же нужно делать проверку ответа сервера и преобразование из json
	- данные на странице сохранять только если запрос выполнился успешно
	- закрывать попап только если запрос на сервер выполнился успешно

	Можно лучше: 
	- проверка ответа сервера и преобразование из json
	дублируется во всех методах класса Api, лучше вынести в отдельный метод

*/

/*

  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
  
*/