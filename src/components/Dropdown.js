import React from 'react';
import {View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
const ROW_TEXT_STYLE = {
  textAlign: 'center',
  textAlignVertical: 'center',
  color: 'black',
  fontSize: 12,
};

function getButtonStyle(style) {
  return {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    padding: 0,
    height: 30,
    width: '100%',
    ...(style ?? {}),
  };
}

function getDropdownStyle(style) {
  return {
    width: '30%',
    marginLeft: '-4%',
    textAlign: 'center',
    color: 'black',
    borderColor: 'black',
    borderRadius: 10,

    ...(style ?? {}),
  };
}

function getButtonLabelStyle(style) {
  return {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderRadius: 0,
    marginLeft: '-5%',
    marginRight: '-5%',
    fontSize: 9,
    ...(style ?? {}),
  };
}

export default function Dropdown({
  options,
  setSelectedOption,
  buttonStyle,
  buttonLabelStyle,
  dropdownStyle,
}) {
  return (
    <View className="w-full">
      <SelectDropdown
        data={options}
        defaultButtonText="▽"
        dropdownStyle={getDropdownStyle(dropdownStyle)}
        buttonStyle={getButtonStyle(buttonStyle)}
        buttonTextStyle={getButtonLabelStyle(buttonLabelStyle)}
        rowTextStyle={ROW_TEXT_STYLE}
        onSelect={(selectedItem, index) => {
          setSelectedOption(selectedItem);
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
      />
    </View>
  );
}
