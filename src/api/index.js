import Storage from '../Storage';
const BASE_URL =
  'https://lspy262udm2a3l3xf6fcxdgzry0yxebi.lambda-url.ap-northeast-2.on.aws';

export default class APIManager {
  static async vote(voteBody) {
    return await APIRequestHelper.request('/app/vote', 'POST', true, voteBody);
  }

  static async getUserInfo() {
    return await APIRequestHelper.request('/app/user-info', 'GET', true);
  }

  static async login(email, password) {
    return await APIRequestHelper.request('/app/signin', 'POST', false, {
      email,
      password,
    });
  }

  static async singup(email, password, name, graduationYear, votingWeight) {
    return await APIRequestHelper.request('/app/user-signup', 'POST', false, {
      email,
      password,
      name,
      graduationYear,
      votingWeight,
    });
  }

  static async changePassword(email, newPassword) {
    return await APIRequestHelper.request(
      '/app/change-password',
      'PATCH',
      false,
      {
        email,
        newPassword,
      },
    );
  }

  static async requestEmailValidation(email) {
    return await APIRequestHelper.request(
      '/app/request-email-validation',
      'POST',
      false,
      {
        email,
      },
    );
  }

  static async voteChange(voteBody) {
    return await APIRequestHelper.request(
      '/app/vote-change',
      'PATCH',
      true,
      voteBody,
    );
  }

  static async reportVoteResult(email, year, month) {
    return await APIRequestHelper.request(
      '/app/report-vote-result',
      'POST',
      true,
      {
        email,
        year,
        month,
      },
    );
  }

  static async getVotingResult(grade, year, month, week) {
    return await APIRequestHelper.request(
      '/app/vote-result',
      'GET',
      true,
      undefined,
      {
        grade,
        year,
        month,
        week,
      },
    );
  }
}

class APIRequestHelper {
  static async request(path, method, auth = false, payload, queryParams) {
    const myHeaders = new Headers();
    const URL = APIRequestHelper.generateRequestURL(path, queryParams);

    myHeaders.append('Content-Type', 'application/json');
    if (auth) {
      const jwtToken = await Storage.getAuth();
      if (jwtToken == null) {
        return null;
      }
      myHeaders.append('x-access-token', jwtToken);
    }
    const requestOptions = {
      method: method,
      headers: myHeaders,
      body: payload ? JSON.stringify(payload) : undefined,
    };

    try {
      const response = await fetch(URL, requestOptions);
      return await response.json();
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static generateRequestURL(path, queryParams) {
    const url = `${BASE_URL}/${path}`;
    if (queryParams) {
      const query = Object.keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`)
        .join('&');
      return `${url}?${query}`;
    }
    return url;
  }
}
