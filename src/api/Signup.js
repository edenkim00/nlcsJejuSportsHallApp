import { apiServerDomain } from './constants';

export async function signup(email, password, name, graduationYear, votingWeight) {
    const apiUrl = apiServerDomain + '/app/user-signup';
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "email": email,
        "password": password,
        "name": name,
        "graduationYear": graduationYear,
        "votingWeight": votingWeight
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
    };
    const response = await fetch(apiUrl, requestOptions)
    return await response.json()
}
