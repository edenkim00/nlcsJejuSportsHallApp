import {Container} from '../components/Container';
import {View} from 'react-native';
import React from 'react';
import {Input} from '../components/Input';
import {Space} from '../components/Space';
import {Button} from '../components/Button';
import {useState} from 'react';
export default function HelloReactNative() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <View className="absolute bottom-40 flex w-full items-center justify-center">
        <EmailInput email={email} setEmail={setEmail} />
        <Space size="h-4" />
        <PasswordInput password={password} setPassword={setPassword} />
        <Space size="h-6" />
        <Button
          label={'Login'}
          onPress={() => {
            //TODO: login
          }}
          extraClassName={
            'border border-[#00AAAA] shadow-blue-900 shadow-lg mt-8 w-48 bg-transparent h-12 rounded-xl'
          }
          fontClassName={'font-normal text-lg font-semibold text-white'}
        />
      </View>
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
        label={'add domain'}
        onPress={() => {
          setEmail(email + '@pupils.nlcsjeju.kr');
        }}
        extraClassName={
          'h-8 rounded-xl absolute border-yellow-200 right-4 -top-2 py-0 px-1 shadow-yellow-100'
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
      />
    </View>
  );
}
