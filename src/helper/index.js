import APIManager from '../api';
import Storage from '../Storage';
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
      const [userInfo, loginInfo] = await Promise.all([
        Storage.get('sportshall_userInfo'),
        Storage.get('sportshall_loginInfo'),
      ]);
      if (userInfo && loginInfo) {
        const userIdFromLoginInfo = JSON.parse(loginInfo)?.userId;
        const userIdFromUserInfo = JSON.parse(userInfo)?.userId;
        if (userIdFromLoginInfo === userIdFromUserInfo) {
          return JSON.parse(userInfo);
        }
      }

      const userInfoFromServer = await APIManager.getUserInfo();
      if (!userInfoFromServer) {
        return null;
      }
      const newUserInfo = userInfoFromServer.result;
      await Storage.set('sportshall_userInfo', JSON.stringify(newUserInfo));
      return newUserInfo;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async get(key) {
    const user = await Helper.getUserInfo();
    if (!user?.[key]) {
      return undefined;
    }
    return user[key];
  }
}
