import React from 'react';
import {View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const OPTIONAL_DROP_DOWN_VALUE = 'Rather not say';
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
  optional = false,
  setSelectedOption,
  buttonStyle,
  buttonLabelStyle,
  dropdownStyle,
  defaultValue = undefined,
}) {
  const valuesConsideringOptional = optional
    ? [OPTIONAL_DROP_DOWN_VALUE, ...options]
    : options;
  return (
    <View className="w-full">
      <SelectDropdown
        data={valuesConsideringOptional}
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
        defaultValue={optional ? OPTIONAL_DROP_DOWN_VALUE : undefined}
      />
    </View>
  );
}

export function CategorySelector({
  categories,
  setSelectedCategory,
  dark = false,
  customStyle = {},
  rowStyle = {},
}) {
  return (
    <View className="flex h-full w-full items-center justify-center">
      <SelectDropdown
        data={categories.map(category => category.id)}
        buttonStyle={getButtonStyle({
          width: '70%',
          borderColor: dark ? 'black' : 'white',
          height: 50,
          paddingTop: 10,
          paddingBottom: 12,
          textAlign: 'center',
          textAlignVertical: 'center',
          fontColor: dark ? 'black' : 'white',
          ...customStyle,
        })}
        buttonTextStyle={getButtonLabelStyle({
          fontSize: 16,
          color: dark ? 'black' : 'white',
          textAlign: 'center',
          fontWeight: '500',
          ...rowStyle,
        })}
        dropdownStyle={getDropdownStyle({
          width: '60%',
          marginLeft: '5%',
          overflow: 'hidden',
          ...rowStyle,
        })}
        onSelect={selectedItem => {
          setSelectedCategory(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return (
            categories?.find(category => category.id === selectedItem)?.name ??
            ''
          );
        }}
        rowTextForSelection={(item, index) => {
          return categories
            .find(category => category.id === item)
            ?.name?.trim();
        }}
        defaultButtonText="▽"
      />
    </View>
  );
}
