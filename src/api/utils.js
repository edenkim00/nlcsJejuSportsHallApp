import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getJWTToken() {
  const loginInfo = await AsyncStorage.getItem('sportshall_loginInfo');
  if (loginInfo == null) {
    return null;
  }
  const parsedLoginInfo = JSON.parse(loginInfo);
  return parsedLoginInfo.jwtToken;
}
