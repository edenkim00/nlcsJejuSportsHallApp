/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import APIManager from '../api';

import {Container} from '../components/Container';
import {View, Alert} from 'react-native';
import {Input, InputWithTailButton} from '../components/Input';
import {Space} from '../components/Space';
import {Button} from '../components/Button';
import {useState} from 'react';
import {mayAlert} from '../lib/utils';
import {emailRegExp} from '../lib/constants';
let emailValidationCode = null;

export default function PasswordPage({navigation}) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVerification, setNewPasswordVerification] = useState('');
  const [validating, setValidating] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verified, setVerified] = useState(false);

  const _validation = () => {
    if (!email || !newPassword || !newPasswordVerification) {
      Alert.alert('Please type email and password.');
      return false;
    }

    if (newPassword.length < 4 || newPassword.length > 12) {
      Alert.alert('Password should be 4-12 characters.');
      return false;
    }

    if (newPassword !== newPasswordVerification) {
      Alert.alert('Password and password verification should be same.');
      return false;
    }

    if (!verified) {
      Alert.alert('Please verify email.');
      return false;
    }

    return true;
  };

  const handlePasswordChange = async () => {
    if (!_validation()) {
      return;
    }
    try {
      const result = await APIManager.changePassword(email, newPassword);
      mayAlert(result);
      if (result?.code === 1000) {
        Alert.alert('Successfully changed password.');
        navigation.navigate('Login');
      }
    } catch (err) {
      Alert.alert('Please retry later.');
      return;
    }
  };

  const handleRequestEmailValidation = async () => {
    if (emailRegExp.test(email) === false) {
      Alert.alert('Please type valid email.');
      return;
    }
    try {
      const result = await APIManager.requestEmailValidation(email, true);
      if (result?.code === 1000 && result?.result?.code) {
        emailValidationCode = result.result.code;
        Alert.alert('Please check your email inbox.');
        setValidating(true);
      } else if (result?.code === 3002) {
        mayAlert(result);
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
      <View className="absolute bottom-32 flex w-full items-center justify-center">
        <InputWithTailButton
          mainInputConfig={{
            label: 'Your Email',
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
              label="New Password"
              value={newPassword}
              setValue={setNewPassword}
              extraClassName="text-normal h-12"
            />
            <Space size="h-8" />
            <Input
              label="New Password Verification"
              value={newPasswordVerification}
              setValue={setNewPasswordVerification}
              extraClassName="text-normal h-12"
            />
            <Space size="h-10" />
            <Button
              label={'Sign Up'}
              onPress={handlePasswordChange}
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
