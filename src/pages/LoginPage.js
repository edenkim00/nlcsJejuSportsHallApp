import React, {useState} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native';
import {styles, loginPageStyles} from '../styles/styles';
import Storage from '../Storage';
import APIManager from '../api';

const emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

function LoginComponent({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!isValidLoginInfo(email, password)) {
      return;
    }
    try {
      const apiResult = await APIManager.login(email, password);
      if (apiResult.code === 1000) {
        const loginInfo = apiResult.result;
        if (
          !(loginInfo && loginInfo.votingWeight && loginInfo.graduationYear)
        ) {
          Alert.alert('Login Failed. Please contact the administrator.');
          return;
        }
        try {
          await Promise.all([
            Storage.set('sportshall_loginInfo', JSON.stringify(loginInfo)),
            Storage.set('sportshall_email', email),
            Storage.set(
              'sportshall_votingWeight',
              String(loginInfo.votingWeight),
            ),
            Storage.set(
              'sportshall_graduationYear',
              String(loginInfo.graduationYear),
            ),
          ]);
          navigation.navigate('BottomTab');
          return;
        } catch (err) {
          Alert.alert('Login Failed, Try again later.');
          return;
        }
      } else if (apiResult.code === 3001) {
        Alert.alert('Check the email and password again.');
        return;
      }
      Alert.alert('Login Failed, Try again later.');
      return;
    } catch (err) {
      Alert.alert('Login Failed, Try again later.');
      return;
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/backgrounds.jpg')}
      style={styles.container}>
      <Text style={styles.title1}>Sports Hall</Text>
      <Text style={styles.title2}>VOTING SYSTEM</Text>
      <Text style={styles.title3}>@NLCS JEJU</Text>
      <Text style={loginPageStyles.label}>Email</Text>
      <TextInput
        style={loginPageStyles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={loginPageStyles.label}>Password</Text>
      <TextInput
        style={loginPageStyles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <View flexDirection="row" styles={{}}>
        <View style={loginPageStyles.button}>
          <Button title="Login" onPress={handleLogin} color="#FFFFFF" />
        </View>
        <View style={loginPageStyles.button_forgotPassword}>
          <Button
            title="Forgot Password"
            onPress={() => {
              navigation.navigate('PasswordPage1');
            }}
            color="#FFFFFF"
          />
        </View>
      </View>

      <View style={loginPageStyles.button_signup}>
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate('SignUpPage1');
          }}
          color="#FFFFFF"
        />
      </View>
    </ImageBackground>
  );
}

export default LoginComponent;

function isValidLoginInfo(email, password) {
  const domain = email.split('@')[1];
  if (domain != 'pupils.nlcsjeju.kr') {
    Alert.alert('This is not a school email.');
    return false;
  }
  if (password.length < 4 || password.length > 12) {
    Alert.alert('Password should be 4-12 characters.');
    return false;
  }

  if (email.match(emailRegExp) == null) {
    Alert.alert('Please type the correct email.');
    return false;
  }
  return true;
}
