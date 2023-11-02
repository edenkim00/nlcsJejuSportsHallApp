import {apiServerDomain} from './constants';

export async function getEmailValidation(email) {
  const apiUrl = `${apiServerDomain}/app/send-email?email=${email}`;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const response = await fetch(apiUrl, requestOptions);
  return await response.json();
}
