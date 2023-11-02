import {apiServerDomain} from './constants';
import {getJWTToken} from './utils';

export async function userInfo() {
  const apiUrl = apiServerDomain + '/app/mypage-info';
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
  return response.json();
}
