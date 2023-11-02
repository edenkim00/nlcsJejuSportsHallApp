import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function HelloReactNativePage() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '40%',
          marginBottom: '40%',
          marginLeft: '10%',
          marginRight: '10%',
          borderRadius: 30,
          backgroundColor: '#dddddd',
        }}>
        <OneDayVotingComponent label="Mon" />
        <OneDayVotingComponent label="Tue" />
        <OneDayVotingComponent label="Wed" />
        <OneDayVotingComponent label="Thr" />
        <OneDayVotingComponent label="Fri1" />
        <OneDayVotingComponent label="Fri2" />
        <OneDayVotingComponent label="Sat1" />
        <OneDayVotingComponent label="Sat2" />
      </View>
    </>
  );
}

function DividerComponent() {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginTop: '3%',
        marginBottom: '3%',
      }}
    />
  );
}

function OneDayVotingComponent({label}) {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <LabelComponent label={label} />
        <VoteComponent />
      </View>
      <DividerComponent />
    </>
  );
}

function LabelComponent({label}) {
  return (
    <Text
      style={{
        fontSize: 18,
        color: 'purple',
        marginBottom: '3%',
        marginLeft: '10%',
        width: '35%',
      }}>
      {label}
    </Text>
  );
}

function VoteComponent() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '65%',
        marginRight: '10%',
      }}>
      <SelectorComponent label={'1'} />

      <SelectorComponent label={'2'} />
    </View>
  );
}

function SelectorComponent({label}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginRight: '10%',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color: 'black',
          marginBottom: '3%',
        }}>
        {label}
      </Text>
      <RNPickerSelect
        onValueChange={() => {}}
        placeholder={{
          label: `▽`,
          value: '',
        }}
        items={[
          {label: 'Basketball', value: 'Basketball'},
          {label: 'Badminton', value: 'Badminton'},
          {label: 'Volleyball', value: 'Volleyball'},
        ]}
        style={{
          inputIOS: {
            textAlign: 'center',
            padding: '1%',
            fontSize: 10,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            borderWidth: 1,
            borderColor: 'blue',
          },
          inputAndroid: {
            textAlign: 'center',
            padding: '1%',
            fontSize: 10,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          },
          placeholder: {
            textAlign: 'center',
            padding: '1%',
            fontSize: 10,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          },
        }}
      />
    </View>
  );
}
