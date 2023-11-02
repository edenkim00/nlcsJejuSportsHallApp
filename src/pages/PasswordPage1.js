import React, {useState} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native';
import {styles, forgotPasswordPageStyles} from '../styles/styles';
import APIManager from '../api';

function PasswordComponent({navigation}) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(null);
  const [authCode, setAuthCode] = useState('');
  const [verified, setVerified] = useState(true);

  const handleEmailValidation = async () => {
    const domain = email.split('@')[1];
    if (domain != 'pupils.nlcsjeju.kr') {
      Alert.alert('This is not a school email.');
      return;
    }
    const result = await APIManager.requestEmailValidation(email);
    const code = result.result.code;
    setCode(code);
    Alert.alert('Please check your email inbox.');
  };

  const handleNextPage = async () => {
    try {
      if (code == null) {
        Alert.alert('Please verify your email ahead.');
        return;
      }
      if (authCode != code) {
        Alert.alert('Auth code is not matched.');
        return;
      }
      if (email == '') {
        Alert.alert('Please retry later.');
        return;
      }
      setVerified(true);
      navigation.navigate('PasswordPage2', {email: email});
      return;
    } catch (err) {
      Alert.alert('Please retry later.');
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
      <Text style={forgotPasswordPageStyles.label}>Email</Text>
      <View flexDirection="row" style={{alignItems: 'center'}}>
        <TextInput
          style={forgotPasswordPageStyles.small_input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={forgotPasswordPageStyles.right_button}>
          <Button
            title="send"
            onPress={handleEmailValidation}
            color="#FFFFFF"
          />
        </View>
      </View>
      <Text style={forgotPasswordPageStyles.label}>AuthCode</Text>
      <TextInput
        style={forgotPasswordPageStyles.input}
        value={authCode}
        onChangeText={text => setAuthCode(text)}
        secureTextEntry={false}
        editable={!verified}
      />
      <View style={forgotPasswordPageStyles.button}>
        <Button title="Verify" onPress={handleNextPage} color="#FFFFFF" />
      </View>
    </ImageBackground>
  );
}

export default PasswordComponent;
