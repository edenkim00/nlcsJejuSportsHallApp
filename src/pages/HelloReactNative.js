import React from 'react';
import APIManager from '../api';
import Storage from '../Storage';

import {Container} from '../components/Container';
import {View, Alert, Text} from 'react-native';
import {Input} from '../components/Input';
import {Space} from '../components/Space';
import {Button} from '../components/Button';
import {useState} from 'react';
import {mayAlert} from '../lib/utils';
import {emailRegExp} from '../lib/constants';

export default function HelloReactNative({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <View className="absolute bottom-32 flex w-full items-center justify-center"></View>
    </Container>
  );
}

function EmailInput({email, setEmail}) {
  return (
    <View className="relative flex w-full flex-row items-end justify-between">
      <Input
        label="Email"
        placeholder="Hello React Native"
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
        placeholder="Hello React Native"
        value={password}
        setValue={setPassword}
        extraClassName="text-normal h-12"
        hideText={true}
      />
    </View>
  );
}

function Option() {
  return (
    <>
      <View className="flex flex-row items-center justify-between bg-transparent">
        <Button
          label={'Sign Up'}
          onPress={() => {
            Alert.alert('Please contact the administrator.');
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
            Alert.alert('Please contact the administrator.');
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
