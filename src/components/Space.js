import {View} from 'react-native';
import React from 'react';
import clsx from 'clsx';

export function Space({size}) {
  return (
    <View
      className={clsx('flex w-full items-center justify-center', `${size}`)}
    />
  );
}
