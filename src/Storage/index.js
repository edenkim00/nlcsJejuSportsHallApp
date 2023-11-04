import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  static async get(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async set(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(key) {
    await AsyncStorage.removeItem(key);
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
