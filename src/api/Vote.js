import { apiServerDomain } from './constants';
import { getJWTToken } from './utils';

export async function vote(voteBody) {
  console.log(voteBody)
  const apiUrl = apiServerDomain + '/app/vote';

  const jwtToken = await getJWTToken();
  if (jwtToken == null) {
    return null;
  }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-access-token", jwtToken);

  const body = JSON.stringify(voteBody);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
  };
  const response = await fetch(apiUrl, requestOptions)
  return await response.json()
}

export async function voteChange(voteBody) {
  const apiUrl = apiServerDomain + '/app/vote-change';
  const jwtToken = await getJWTToken();
  if (jwtToken == null) {
    return null;
  }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-access-token", jwtToken);

  const body = JSON.stringify(voteBody);

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: body,
  };
  const response = await fetch(apiUrl, requestOptions)
  return await response.json()
}
