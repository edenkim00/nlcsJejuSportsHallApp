import {apiServerDomain} from './constants';
import {getJWTToken} from './utils';

export async function sendEmailToAdminAPI(email, year, month) {
  const apiUrl = `${apiServerDomain}/app/sending-email-result?email=${email}&year=${year}&month=${month}`;

  const jwtToken = await getJWTToken();
  if (jwtToken == null) {
    return null;
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('x-access-token', jwtToken);
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  const response = await fetch(apiUrl, requestOptions);
  return await response.json();
}
