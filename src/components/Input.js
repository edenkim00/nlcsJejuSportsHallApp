import React from 'react';
import clsx from 'clsx';
import {TextInput, View, Text} from 'react-native';

export function Input({
  label = undefined,
  value,
  setValue,
  placeholder,
  extraClassName,
  width,
}) {
  return (
    <View
      className={clsx(
        'flex w-full items-center justify-center space-y-2',
        `${width}`,
      )}>
      {label && (
        <View className="relative z-50 w-full">
          <Text className="absolute -top-2 left-1/4 z-50 -ml-7 text-xl font-bold text-yellow-300">
            {label}
          </Text>
        </View>
      )}
      <TextInput
        className={clsx(
          'z-10 flex h-12 w-3/4 rounded-md border border-white  bg-transparent px-5 font-normal text-white',
          `${extraClassName}`,
        )}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
      />
    </View>
  );
}
