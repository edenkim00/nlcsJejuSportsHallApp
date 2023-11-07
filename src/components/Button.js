import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import clsx from 'clsx';
export default function Button({
  label,
  onPress,
  extraClassName,
  fontClassName,
}) {
  const [calling, setCalling] = useState(false);
  return (
    <TouchableOpacity
      onPress={async () => {
        if (calling) {
          return;
        }
        setCalling(true);
        try {
          await onPress();
        } catch (err) {
          console.log(err);
        } finally {
          setCalling(false);
        }
      }}
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className={clsx(
        'flex items-center justify-center rounded-md border-2 border-[#AAFF] bg-black px-4 py-1 text-xs font-normal  text-black shadow-sm shadow-purple-900 hover:border-[#00AAAA] hover:bg-[#00AAAA] focus:outline-none focus:ring-2 focus:ring-[#00AAAA] focus:ring-opacity-50',
        `${extraClassName}`,
      )}>
      {calling ? (
        <Text
          className={clsx(
            'text-center text-sm font-bold text-white',
            `${fontClassName}`,
          )}>
          {'Loading...'}
        </Text>
      ) : (
        <Text
          className={clsx(
            'text-center text-sm font-bold text-white',
            `${fontClassName}`,
          )}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
