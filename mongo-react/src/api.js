
// import axios from 'axios';
export default {
	user: {
			login: credentials => fetch('http://mongo-api-krasimirpetrow293780.codeanyapp.com:8080/api/auth/', {
					method: 'POST', 
					headers: {
      					'Content-Type': 'application/json',
      					'Accept': 'application/json'
					},
					body: JSON.stringify({credentials})
				})
				.then(res => {
						if(res.status === 400) {
							 throw res.json().then( (json)=>json); 
						}
						
						if(res.status === 200) {
							return res.json().then( (json)=>json)
						}
				})
			
		}
	}
