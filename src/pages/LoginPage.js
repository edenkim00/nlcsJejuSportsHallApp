import React, {useEffect} from 'react';
import APIManager from '../api';
import Storage from '../storage';

import Container from '../components/Container';
import {View, Alert, Text} from 'react-native';
import Input from '../components/Input';
import Space from '../components/Space';
import Button from '../components/Button';
import LoadingComponent from '../components/Loading';
import {useState} from 'react';
import {mayAlert} from '../lib/utils';
import {emailRegExp} from '../lib/constants';

export default function LoginPage({navigation}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loginInfo = async () => {
      const loginInfoFromStorage = await Storage.get('sportshall_loginInfo');
      if (loginInfoFromStorage) {
        navigation.navigate('BottomTab');
        return;
      }
      setLoading(false);
    };
    loginInfo();
  }, [navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      {loading ? (
        <LoadingComponent />
      ) : (
        <View className="absolute bottom-32 flex w-full items-center justify-center">
          <EmailInput email={email} setEmail={setEmail} />
          <Space size="h-6" />
          <PasswordInput password={password} setPassword={setPassword} />
          <Space size="h-10" />
          <Button
            label={'Login'}
            onPress={async () => {
              if (!email || !password) {
                Alert.alert('Please type email and password.');
                return;
              }
              if (emailRegExp.test(email) === false) {
                Alert.alert('Please type valid email.');
                return;
              }
              const result = await APIManager.login(email, password);
              if (result.code === 1000) {
                await Storage.set(
                  'sportshall_loginInfo',
                  JSON.stringify(result.result),
                );

                navigation.navigate('BottomTab');
                return;
              }
              mayAlert(result);
            }}
            extraClassName={
              'border-2 border-[#00AAAA] shadow-blue-900 shadow-lg mt-8 w-48 bg-transparent h-12 rounded-xl'
            }
            fontClassName={'font-normal text-lg font-semibold text-white'}
          />
          <Space size="h-3" />
          <Option navigation={navigation} />
        </View>
      )}
    </Container>
  );
}

function EmailInput({email, setEmail}) {
  return (
    <View className="relative flex w-full flex-row items-end justify-between">
      <Input
        label="Email"
        placeholder="Type your email"
        value={email}
        setValue={setEmail}
        extraClassName="text-normal h-12"
      />
      <Button
        label={'+ domain'}
        onPress={() => {
          setEmail(email + '@pupils.nlcsjeju.kr');
        }}
        extraClassName={
          'h-8 rounded-xl absolute border-yellow-200 right-8 -top-2 py-0 px-1 shadow-yellow-100'
        }
        fontClassName={'font-normal text-xs text-white'}
      />
    </View>
  );
}

function PasswordInput({password, setPassword}) {
  return (
    <View className="flex flex-row items-end justify-between">
      <Input
        label="Password"
        placeholder="Type your password"
        value={password}
        setValue={setPassword}
        extraClassName="text-normal h-12"
        hideText={true}
      />
    </View>
  );
}

function Option({navigation}) {
  return (
    <>
      <View className="flex flex-row items-center justify-between bg-transparent">
        <Button
          label={'Sign Up'}
          onPress={() => {
            navigation.navigate('SignUpPage');
          }}
          extraClassName={
            'text-xs text-white border-0 shadow-none bg-transparent'
          }
          fontClassName={'font-light'}
        />
        <Text className="text-xs text-white">|</Text>
        <Button
          label={'Forgot Password?'}
          onPress={() => {
            navigation.navigate('PasswordPage');
          }}
          extraClassName={
            'text-xs text-white  border-0 shadow-none bg-transparent'
          }
          fontClassName={'font-light'}
        />
      </View>
    </>
  );
}
