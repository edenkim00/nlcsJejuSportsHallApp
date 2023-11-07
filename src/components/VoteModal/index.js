import React, {useEffect, useState} from 'react';
import {
  Modal,
  Alert,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Space from '../Space';
import {DAYS_AVAILABLE, SPORTS_AVAILABLE} from './constants';
import Dropdown from '../Dropdown';
import {Picker} from '@react-native-picker/picker';
const NONELABEL = 'None';
const DROPDOWN_STYLE = {
  paddingHorizontal: '5%',
  marginHorizontal: '2%',
  fontSize: 11,
  color: 'black',
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 30,
  width: '100%',
};

export default function VoteModal({showVoteModal, setShowVoteModal}) {
  const [voteData, setVoteData] = useState(
    Object.fromEntries(
      DAYS_AVAILABLE.map(day => [day, [NONELABEL, NONELABEL]]),
    ),
  );
  const onVoteSelectorChange = (key, value) => {
    setVoteData({...voteData, [key]: value});
  };

  function validateVoteData() {
    console.log(voteData);

    return !DAYS_AVAILABLE.map(day => {
      return (
        voteData &&
        voteData[day] &&
        voteData[day].length == 2 &&
        [...SPORTS_AVAILABLE, 'None'].includes(voteData[day][0]) &&
        [...SPORTS_AVAILABLE, 'None'].includes(voteData[day][1]) &&
        (voteData[day][0] != voteData[day][1] || voteData[day][0] == 'None')
      );
    }).some(x => !x);
  }

  return (
    <Modal visible={showVoteModal} transparent animationType="slide">
      <View className="absolute bottom-1/4 left-[12.5%] h-1/2 w-3/4 rounded-xl bg-[#FFFFFFDD] px-6  py-8">
        <View className="h-[90%]">
          <Text className="h-[10%] text-center text-lg font-bold text-blue-700">
            🗳️ Vote for Sports
          </Text>
          <Space size="h-4" />
          <Header />
          <ScrollView className="h-3/4">
            <Space size="h-5" />
            {DAYS_AVAILABLE.map((day, index) => {
              return (
                <View key={index}>
                  <VoteSelector label={day} onChange={onVoteSelectorChange} />
                  <Space size="h-3" />
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View className="absolute bottom-2 right-6 h-[10%] flex flex-row">
          <TouchableOpacity
            className=""
            onPress={() => {
              if (!validateVoteData()) {
                Alert.alert('Invalid Vote Data', 'Please check your vote data');
                return;
              }
              setShowVoteModal(false);
            }}>
            <View className="flex flex-row">
              <Space size="w-4" />
              <Text className="text-center text-lg font-semibold text-blue-900 ">
                Submit
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => {
              setShowVoteModal(false);
            }}>
            <View className="flex flex-row">
              <Space size="w-4" />
              <Text className="text-center text-lg font-semibold">Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function Header() {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="w-[20%] text-center text-lg font-semibold text-red-900">
        Day
      </Text>
      <Space size="w-[5%]" />
      <View className="flex w-[75%] flex-row px-1">
        <Text className="w-[45%] text-center text-lg font-semibold text-purple-800">
          First
        </Text>
        <Space size="w-[10%]" />
        <Text className="w-[45%] text-center text-lg font-semibold text-purple-800">
          Second
        </Text>
      </View>
    </View>
  );
}

function VoteSelector({label, onChange}) {
  const [firstSportsOptions, setFirstSportsOptions] = useState([
    ...SPORTS_AVAILABLE,
  ]);
  const [secondSportsOptions, setSecondSportsOptions] = useState([
    ...SPORTS_AVAILABLE,
  ]);

  const [firstOption, setFirstOption] = useState(NONELABEL);
  const [secondOption, setSecondOption] = useState(NONELABEL);

  useEffect(() => {
    setFirstSportsOptions([
      ...SPORTS_AVAILABLE.filter(
        sport => sport != secondOption && sport != NONELABEL,
      ),
    ]);
    onChange(label, [firstOption, secondOption]);
  }, [secondOption]);

  useEffect(() => {
    setSecondSportsOptions([
      ...SPORTS_AVAILABLE.filter(
        sport => sport != firstOption && sport != NONELABEL,
      ),
    ]);

    onChange(label, [firstOption, secondOption]);
  }, [firstOption]);

  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="w-[20%] text-center font-semibold text-green-800">
        {label}
      </Text>
      <Space size="w-[5%]" />
      <View className="flex w-[75%] flex-row px-1">
        <View className="w-[45%]">
          <SportSelector
            availableSports={firstSportsOptions}
            onChange={setFirstOption}
          />
        </View>
        <Space size="w-[10%]" />
        <View className="w-[45%]">
          <SportSelector
            availableSports={secondSportsOptions}
            onChange={setSecondOption}
          />
        </View>
      </View>
    </View>
  );
}

function SportSelector({availableSports, onChange}) {
  return (
    <View className="w-full">
      <Dropdown options={availableSports} setSelectedOption={onChange} />
    </View>
  );
}
