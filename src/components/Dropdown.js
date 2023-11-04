import React from 'react';
import {View, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
export default function Dropdown({
  label = undefined,
  options,
  selectedOption,
  setSelectedOption,
  style,
}) {
  const [value, setValue] = React.useState(selectedOption);
  const mixedStyle = {
    width: 100,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
    padding: '3%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    ...(style ?? {}),
  };
  return (
    <RNPickerSelect
      onValueChange={setValue}
      onDonePress={() => {
        setSelectedOption(value);
      }}
      placeholder={{
        label: `${label} ▽`,
        value: selectedOption,
      }}
      items={options.map(option => ({
        label: option,
        value: option,
      }))}
      style={{
        inputIOS: {...mixedStyle},
        inputAndroid: {...mixedStyle},
        placeholder: {...mixedStyle},
      }}
    />
  );
}
