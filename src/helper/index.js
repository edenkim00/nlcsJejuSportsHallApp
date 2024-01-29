import APIManager from '../api';
import {loginResponse} from '../lib/constants';
import Storage from '../Storage';
import {USER_INFO_FILEDS} from './constants';
export default class Helper {
  static async handleLogout() {
    try {
      await Storage.remove('sportshall_loginInfo');
      await Storage.remove('sportshall_userInfo');
    } catch (err) {
      console.log(err);
    }
  }

  static async getUserInfo() {
    try {
      const userInfoFromStorage = await Storage.get('sportshall_userInfo');
      if (userInfoFromStorage) {
        return JSON.parse(userInfoFromStorage);
      }
      const userInfoFromServer = await APIManager.getUserInfo();

      if (!userInfoFromServer) {
        throw new Error('Something went wrong.');
      }
      const newUserInfo = userInfoFromServer;
      await Storage.set('sportshall_userInfo', JSON.stringify(newUserInfo));
      return newUserInfo;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  static async getLoginInfo() {
    try {
      let loginInfo = loginResponse?.[USER_INFO_FILEDS.USER_ID]
        ? loginResponse
        : await Storage.get('sportshall_loginInfo');

      if (loginInfo) {
        return JSON.parse(loginInfo);
      }
      return undefined;
    } catch (err) {
      return undefined;
    }
  }

  static async get(key) {
    return (await Helper.getLoginInfo())?.[key];
  }
}
