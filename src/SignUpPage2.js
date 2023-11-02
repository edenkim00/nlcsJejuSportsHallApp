import React, {useState} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native';
import {styles, signUpPageStyles} from './styles';
import {signup} from './api/Signup';
import {getEmailValidation} from './api/EmailValidation';
import RNPickerSelect from 'react-native-picker-select';

function SignUpComponent2({navigation}) {
  const {name, graduationYear} = navigation.state.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [code, setCode] = useState(null);
  const [authCode, setAuthCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [voteWeight, setVoteWeight] = useState(0);

  React.useEffect(() => {
    if (!(name && graduationYear)) {
      Alert.alert('Please retry signup process from the beginning.');
      navigation.navigate('Login');
    }
  }, []);

  const handleEmailValidation = async () => {
    try {
      const domain = email.split('@')[1];
      if (domain != 'pupils.nlcsjeju.kr') {
        Alert.alert('This is not a school email.');
        return;
      }
      const result = await getEmailValidation(email);
      const code = result.result.code;
      setCode(code);
      Alert.alert('Please check your email inbox.');
    } catch (err) {
      Alert.alert('Please retry later.');
    }
  };
  const handleVerify = async () => {
    try {
      if (code == null) {
        Alert.alert('Please verify your email ahead.');
        return;
      }
      if (authCode == code) {
        setVerified(true);
        Alert.alert('Verified.');
        return;
      }
      Alert.alert('Auth code is not matched.');
      return;
    } catch (err) {
      Alert.alert('Please retry later.');
      return;
    }
  };
  const handleSignUp = async () => {
    try {
      // email validation
      const domain = email.split('@')[1];
      if (domain != 'pupils.nlcsjeju.kr') {
        Alert.alert('Unauthorized email.');
        return;
      }
      if (!verified) {
        Alert.alert('Please verify your email ahead.');
        return;
      }
      // password validation
      if (password != passwordVerification) {
        Alert.alert('Check the password again');
        return;
      }
      // 졸업년도 validation
      const parsedEmail = email.split('@')[0];
      const emailGraduation = parsedEmail.substring(
        parsedEmail.length - 2,
        parsedEmail.length,
      );
      if (emailGraduation != graduationYear.substring(2, 4)) {
        Alert.alert('Check the email or graduation year again');
        return;
      }

      // voting weight validation
      if (voteWeight == 0) {
        Alert.alert('Check the voting weight again');
        return;
      }
      const apiResult = await signup(
        email,
        password,
        name,
        graduationYear,
        voteWeight,
      );
      Alert.alert('Sign up success!');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Please retry later.');
      return;
    }
  };

  return (
    <ImageBackground
      source={require('../assets/backgrounds.jpg')}
      style={styles.container}>
      <Text style={styles.title1}>Sports Hall</Text>
      <Text style={signUpPageStyles.label}>Email</Text>
      <View flexDirection="row" style={{alignItems: 'center'}}>
        <TextInput
          style={signUpPageStyles.small_input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={signUpPageStyles.right_button}>
          <Button
            title="send"
            onPress={handleEmailValidation}
            color="#FFFFFF"
          />
        </View>
      </View>
      <Text style={signUpPageStyles.label}>AuthCode</Text>
      <View flexDirection="row" style={{alignItems: 'center'}}>
        <TextInput
          style={signUpPageStyles.small_input}
          value={authCode}
          onChangeText={text => setAuthCode(text)}
          secureTextEntry={false}
          editable={!verified}
        />
        <View style={signUpPageStyles.right_button}>
          <Button title="verify" onPress={handleVerify} color="#FFFFFF" />
        </View>
      </View>
      <Text style={signUpPageStyles.password_label}>Password</Text>
      <TextInput
        style={signUpPageStyles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <Text style={signUpPageStyles.password_label}>Password Verification</Text>
      <TextInput
        style={signUpPageStyles.input}
        value={passwordVerification}
        onChangeText={text => setPasswordVerification(text)}
        secureTextEntry={true}
      />

      <Text style={signUpPageStyles.small_label}>
        How often do you use the sports hall?
      </Text>
      <View
        style={{
          borderColor: 'white',
          borderWidth: 1,
          width: '80%',
          marginBottom: '2%',
        }}>
        <RNPickerSelect
          title=""
          onValueChange={value => setVoteWeight(value)}
          placeholder={{
            label: 'Select a Vote Weight ▽',
            value: '',
          }}
          items={[
            {label: 'Everyday', value: 8},
            {label: 'Often', value: 7},
            {label: 'Normal', value: 6},
            {label: 'Rarely', value: 5},
            {label: 'Never', value: 4},
          ]}
          style={{
            inputIOS: {
              textAlign: 'center',
              color: '#FFFFFF',
              fontSize: 15,
              padding: '3%',
            },
            inputAndroid: {
              textAlign: 'center',
              color: '#FFFFFF',
              fontSize: 15,
              padding: '3%',
            },
            placeholder: {
              textAlign: 'center',
              color: '#FFFFFF',
              fontSize: 15,
              padding: '3%',
            },
          }}
        />
      </View>
      <View style={signUpPageStyles.button}>
        <Button title="Sign Up" onPress={handleSignUp} color="#FFFFFF" />
      </View>
    </ImageBackground>
  );
}

export default SignUpComponent2;
