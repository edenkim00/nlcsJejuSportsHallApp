/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageBackground, View, Text} from 'react-native';

export function Container({children}) {
  return (
    <View className="flex flex-col items-center justify-center ">
      <ImageBackground
        source={require('../../assets/backgrounds.jpg')}
        style={{width: '100%', height: '100%'}}
        className="flex flex-col items-center justify-center text-white">
        <Text className="absolute top-32 text-4xl font-bold text-white">
          Sports Hall
        </Text>
        <Text className=" absolute top-44 mt-2 text-white">VOTING SYSTEM</Text>
        <Text className="absolute top-60 text-lg font-semibold -tracking-tight text-white">
          @NLCS JEJU
        </Text>
        {children}
      </ImageBackground>
    </View>
  );
}
