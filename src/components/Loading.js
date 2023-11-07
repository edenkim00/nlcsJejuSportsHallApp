import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Space from './Space';

export default function LoadingComponent() {
  return (
    <View className="flex items-center justify-center">
      <Space size="h-48" />
      <ActivityIndicator size="large" color="#00FFFF" />
    </View>
  );
}
