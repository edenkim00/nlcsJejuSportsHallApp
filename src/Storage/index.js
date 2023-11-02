import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  static get(key) {
    return AsyncStorage.getItem(key);
  }

  static set(key, value) {
    AsyncStorage.setItem(key, value);
  }

  static remove(key) {
    AsyncStorage.removeItem(key);
  }
  static async getAuth() {
    try {
      const loginInfo = await Storage.get('sportshall_loginInfo');
      if (loginInfo == null) {
        return null;
      }
      const parsedLoginInfo = JSON.parse(loginInfo);
      return parsedLoginInfo.jwtToken;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
