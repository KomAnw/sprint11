class Api {
  constructor(options) {
  	this.url = options.url;
  	this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  getUserInfo = () =>{
  	return fetch(`${this.url}/users/me`, {
  		headers: this.headers
  	})
  		.then(res=>this._getResponseData(res))
  }

  getInitialCards = () =>{
    return fetch(`${this.url}/cards`, {
    	headers: this.headers
    })
    	.then(res=>this._getResponseData(res))
    	
  }
    
  patchProfile = (body) =>{
  	return fetch(`${this.url}/users/me`, {
		  method: 'PATCH',
		  headers: this.headers,
		  body: JSON.stringify(body),
		})
      .then(res=>this._getResponseData(res))
  }
}