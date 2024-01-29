import Storage from '../Storage';
import {RESPONSE_CODES} from './constants';
const BASE_URL =
  'https://lspy262udm2a3l3xf6fcxdgzry0yxebi.lambda-url.ap-northeast-2.on.aws';

export default class APIManager {
  /* voting */
  static async vote(voteBody) {
    return await APIRequestHelper.request('/app/vote', 'POST', true, voteBody);
  }

  static async getConfirmedResult(category_id) {
    return await APIRequestHelper.request(
      '/app/confirmed-result',
      'GET',
      true,
      undefined,
      {
        category_id,
      },
    );
  }

  static async getVoteCategories(graduation_year) {
    return await APIRequestHelper.request(
      '/app/vote-categories',
      'GET',
      true,
      undefined,
      {
        graduation_year,
      },
    );
  }

  /* user */
  static async signUp(email, password, name, sex, graduationYear) {
    return await APIRequestHelper.request('/app/user-signup', 'POST', false, {
      email,
      password,
      name,
      sex,
      graduationYear,
    });
  }

  static async login(email, password) {
    return await APIRequestHelper.request('/app/signin', 'POST', false, {
      email,
      password,
    });
  }

  static async deleteAccount() {
    return await APIRequestHelper.request('/app/delete-account', 'POST', true);
  }

  static async getUserInfo() {
    return await APIRequestHelper.request('/app/user-info', 'GET', true);
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

  static async requestEmailValidation(email, shouldExist = false) {
    return await APIRequestHelper.request(
      '/app/request-email-validation',
      'POST',
      false,
      {
        email,
        shouldExist,
      },
    );
  }

  /* admin */
  static async confirm(confirmedData) {
    return await APIRequestHelper.request(
      '/app/confirm',
      'POST',
      true,
      confirmedData,
    );
  }

  static async postVoteCategories(
    name,
    grade,
    opened_dt = undefined,
    deadline,
  ) {
    return await APIRequestHelper.request('/app/open-vote', 'POST', true, {
      name,
      grade,
      opened_dt,
      deadline,
    });
  }

  static async reportVoteResult(email, category_id) {
    return await APIRequestHelper.request(
      '/app/report-vote-result',
      'POST',
      true,
      {
        email,
        category_id,
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
      const json = await response.json();
      if (json?.code != RESPONSE_CODES.SUCCESS) {
        throw new Error(json?.message);
      }
      return json.result ?? true;
    } catch (err) {
      throw new Error(err);
    }
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
