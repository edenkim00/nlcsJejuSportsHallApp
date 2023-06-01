import { apiServerDomain } from './constants';

export async function changePassword(email, newPassword){
    const apiUrl = apiServerDomain + '/app/change-password';
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "email": email,
      "newPassword": newPassword,
    });

    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: body,
    };
    const response = await fetch(apiUrl, requestOptions)
    return await response.json()
}
