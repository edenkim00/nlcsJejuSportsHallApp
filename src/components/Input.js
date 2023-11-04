import React, {useState} from 'react';
import clsx from 'clsx';
import {TextInput, View, Text} from 'react-native';
import {Button} from './Button';
export function Input({
  label = undefined,
  value,
  setValue,
  placeholder,
  extraClassName,
  width,
  hideText = false,
}) {
  return (
    <View
      className={clsx(
        'flex w-full items-center justify-center space-y-2',
        `${width ?? ''}`,
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
          'z-10 flex h-12 w-3/4 rounded-md border border-white  bg-transparent px-5 font-normal text-white placeholder:text-white placeholder:text-opacity-50',
          `${extraClassName}`,
        )}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={'#C4C4C4'}
        secureTextEntry={hideText}
      />
    </View>
  );
}

export function InputWithTailButton({mainInputConfig, tailButtonConfig}) {
  const [loading, setLoading] = useState(false);

  if (!(mainInputConfig && tailButtonConfig)) {
    return null;
  }
  const {
    label: mainInputlLabel,
    value: mainInputValue,
    setValue: mainInputSetValue,
    extraClassName: mainInputExtraClassName,
    fontClassName: mainInputFontClassName,
    placeholder: mainInputPlaceholder,
  } = mainInputConfig;

  const {
    label: tailButtonLabel,
    onPress: tailButtonOnPress,
    extraClassName: tailButtonExtraClassName,
    fontClassName: tailButtonFontClassName,
    show: tailButtonShow,
  } = tailButtonConfig;

  if (
    !(
      mainInputValue !== undefined &&
      mainInputSetValue &&
      tailButtonLabel &&
      tailButtonOnPress
    )
  ) {
    return null;
  }

  return (
    <View className="relative flex w-full">
      <Input
        label={mainInputlLabel}
        placeholder={mainInputPlaceholder ?? ''}
        value={mainInputValue}
        setValue={mainInputSetValue}
        extraClassName={mainInputExtraClassName}
        fontClassName={mainInputFontClassName}
      />
      {(tailButtonShow ?? true) && (
        <View className="absolute bottom-0 flex w-full items-center">
          <View className="w-3/4">
            <Button
              label={loading ? 'Loading...' : tailButtonLabel}
              onPress={async () => {
                setLoading(true);
                await tailButtonOnPress();
                setLoading(false);
              }}
              extraClassName={clsx(
                'absolute bottom-1 right-1 h-10 rounded-lg border-yellow-200 px-2 py-1 shadow-yellow-100',
                `${tailButtonExtraClassName}`,
              )}
              fontClassName={clsx(
                'text-xs font-normal text-white',
                `${tailButtonFontClassName}`,
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}
