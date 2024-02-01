import React from 'react';
import APIManager from '../api';

import Container from '../components/Container';
import {View, Alert, Text} from 'react-native';
import Input, {InputWithTailButton} from '../components/Input';
import Space from '../components/Space';
import Button from '../components/Button';
import {useState} from 'react';
import {EMAIL_REG_EXPR, GENDER_OPTIONS} from '../lib/constants';
import Dropdown from '../components/Dropdown';
import {getGraduationYears} from '../lib/utils';
import {RESPONSE_CODES} from '../api/constants';
let emailValidationCode = null;

const DROPDOWN_STYLE = {
  borderColor: 'white',
  marginLeft: '2%',
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
};

const DROPDOWN_BUTTON_TEXT_STYLE = {
  fontSize: 14,
  color: 'white',
  textAlign: 'center',
  fontWeight: '400',
};

export default function SignUpPage({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [validating, setValidating] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verified, setVerified] = useState(false);

  const _validation = () => {
    if (!email || !password) {
      Alert.alert('Please type email and password.');
      return false;
    }

    if (EMAIL_REG_EXPR.test(email) === false) {
      Alert.alert('Please type valid email.');
      return false;
    }

    if (name.length > 15) {
      Alert.alert('Name should be less than 16 characters.');
      return false;
    }

    if (password.length < 4 || password.length > 12) {
      Alert.alert('Password should be 4-12 characters.');
      return false;
    }
    if (!name) {
      Alert.alert('Please type name.');
      return false;
    }
    if (!verified) {
      Alert.alert('Please verify email.');
      return false;
    }

    if (!graduationYear) {
      Alert.alert('Please select graduation year.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!_validation()) {
      return;
    }
    try {
      await APIManager.signUp(email, password, name, gender, graduationYear);

      Alert.alert('Successfully Signed Up!');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert(err.message?.replace('Error: ', '') ?? 'Please retry later.');
      return;
    }
  };

  const handleRequestEmailValidation = async () => {
    if (EMAIL_REG_EXPR.test(email) === false) {
      Alert.alert('Please type valid email.');
      return;
    }

    try {
      const result = await APIManager.requestEmailValidation(email);
      if (result?.code) {
        emailValidationCode = result.code;
        Alert.alert('Please check your email inbox.');
        setValidating(true);
      } else {
        throw new Error('Failed to validate email.');
      }
    } catch (err) {
      Alert.alert('Please retry later.');
      return;
    }
  };

  const handleVerifyEmail = async () => {
    if (verificationCode !== emailValidationCode) {
      Alert.alert('Please type valid verification code.');
      return;
    }
    setVerified(true);
    Alert.alert('Successfully verified email.');
    setValidating(false);
  };

  return (
    <Container>
      <View className="absolute bottom-[10%] flex w-full items-center justify-center">
        {!verified && (
          <InputWithTailButton
            mainInputConfig={{
              label: 'Email',
              value: email,
              setValue: setEmail,
              extraClassName: 'text-normsdl h-12',
            }}
            tailButtonConfig={{
              label: 'verify',
              onPress: handleRequestEmailValidation,
              extraClassName: 'w-16 shadow-none',
              fontClassName: 'font-normal text-xs text-white',
              show: !verified,
            }}
          />
        )}
        {validating && (
          <>
            <Space size="h-4" />
            <InputWithTailButton
              mainInputConfig={{
                value: verificationCode,
                setValue: setVerificationCode,
                placeholder: 'Verification Code',
                extraClassName: 'text-normal border-blue-400',
                fontClassName: 'text-xs font-normal',
              }}
              tailButtonConfig={{
                label: 'check',
                onPress: handleVerifyEmail,
                extraClassName: 'border-blue-500 shadow-none w-16',
                fontClassName: 'font-normal text-xs text-white',
                show: !verified,
              }}
            />
          </>
        )}
        {!verified && <Space size="h-28" />}
        {verified && (
          <>
            <Space size="h-8" />
            <Input
              label="Name"
              value={name}
              setValue={setName}
              extraClassName="text-normal h-12"
            />
            <Space size="h-2" />
            <View className="flex w-3/4 flex-row items-center justify-between">
              <View className="flex w-[48%] flex-col items-center">
                <Text className="mb-1 text-center text-lg font-semibold text-yellow-400">
                  Graduation Year
                </Text>
                <Dropdown
                  options={getGraduationYears()}
                  setSelectedOption={setGraduationYear}
                  dropdownStyle={DROPDOWN_STYLE}
                  buttonStyle={DROPDOWN_STYLE}
                  buttonLabelStyle={DROPDOWN_BUTTON_TEXT_STYLE}
                />
              </View>
              <Space size="w-[4%]" />
              <View className="flex w-[48%]">
                <Text className="mb-1 text-center text-lg font-semibold text-yellow-400">
                  Gender
                </Text>
                <Dropdown
                  optional={true}
                  options={GENDER_OPTIONS}
                  setSelectedOption={setGender}
                  dropdownStyle={DROPDOWN_STYLE}
                  buttonStyle={DROPDOWN_STYLE}
                  buttonLabelStyle={DROPDOWN_BUTTON_TEXT_STYLE}
                />
              </View>
            </View>
            <Space size="h-8" />
            <Input
              label="Password"
              value={password}
              setValue={setPassword}
              extraClassName="text-normal h-12"
            />

            <Space size="h-10" />
            <Button
              label={'Sign Up'}
              onPress={handleSignUp}
              extraClassName={
                'border-2 border-[#AAFF] shadow-blue-900 shadow-lg w-48 bg-transparent h-12 rounded-xl'
              }
              fontClassName={'font-normal text-lg font-semibold text-white'}
            />
          </>
        )}
      </View>
    </Container>
  );
}
