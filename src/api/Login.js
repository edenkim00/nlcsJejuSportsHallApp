import { apiServerDomain } from './constants';

export async function postLogin(email, password){
    const apiUrl = apiServerDomain + '/app/signin';
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "email": email,
      "password": password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
    };
    const response = await fetch(apiUrl, requestOptions)
    return await response.json()
}
