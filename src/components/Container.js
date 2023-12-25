/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

export default function Container({children}) {
  const [showText, setShowText] = useState(true);
  useEffect(() => {
    if (Platform.OS === 'android') {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setShowText(false);
        },
      );

      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setShowText(true);
        },
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);

  return (
    <View className="z-0 flex flex-col items-center justify-center">
      <ImageBackground
        source={require('../../assets/backgrounds.jpg')}
        style={{width: '100%', height: '100%', zIndex: 0}}
        className="flex flex-col items-center justify-center text-white">
        {showText && (
          <>
            <Text className="absolute top-32 text-4xl font-bold text-white">
              Sports Hall
            </Text>
            <Text className=" absolute top-44 mt-2 text-white">
              VOTING SYSTEM
            </Text>
            <Text className="absolute top-60 text-lg font-semibold -tracking-tight text-white">
              @NLCS JEJU
            </Text>
          </>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1, width: '100%'}}>
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
