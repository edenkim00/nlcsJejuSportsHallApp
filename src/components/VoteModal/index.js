import React, {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Space from '../Space';
import {DAYS_AVAILABLE, SPORTS_AVAILABLE} from './constants';
import Dropdown from '../Dropdown';

const DROPDOWN_STYLE = {
  paddingHorizontal: '5%',
  marginHorizontal: '2%',
  fontSize: 11,
  color: 'black',
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 2,
  width: '100%',
};

export default function VoteModal({showVoteModal, setShowVoteModal}) {
  const [voteData, setVoteData] = useState({});
  const onVoteSelectorChange = (key, value) => {
    setVoteData({...voteData, key: value});
  };
  return (
    <Modal visible={showVoteModal} transparent animationType="slide">
      <View className="absolute bottom-1/4 left-[12.5%] h-1/2 w-3/4 rounded-xl bg-[#FFFFFFDD] px-6  py-8">
        <View className="h-[90%]">
          <Text className="h-[10%] text-center text-lg font-bold text-blue-700">
            🗳️ Vote for Sports
          </Text>
          <Space size="h-4" />
          <ScrollView className="h-3/4">
            <Header />
            <Space size="h-4" />
            <VoteSelector
              label={DAYS_AVAILABLE[0]}
              onChange={onVoteSelectorChange}
            />
          </ScrollView>
        </View>
        <View className="absolute bottom-2 right-6 h-[10%]">
          <TouchableOpacity
            className=""
            onPress={() => {
              setShowVoteModal(false);
            }}>
            <Text className="text-center text-lg font-semibold text-blue-900">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function Header() {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="w-[30%] text-center text-lg font-semibold text-red-900">
        Day
      </Text>
      <View className="flex w-[70%] flex-row px-1">
        <Text className="w-[45%] text-center text-lg font-semibold text-red-900">
          First
        </Text>
        <Space size="w-[10%]" />
        <Text className="w-[45%] text-center text-lg font-semibold text-red-900">
          Second
        </Text>
      </View>
    </View>
  );
}

function VoteSelector({label, onChange}) {
  console.log('key', DAYS_AVAILABLE[0]);

  const [firstOption, setFirstOption] = useState(SPORTS_AVAILABLE[0].value);
  const [secondOption, setSecondOption] = useState(SPORTS_AVAILABLE[0].value);
  const SPORTS_LABELS = SPORTS_AVAILABLE.map(s => s.label);
  useEffect(() => {
    onChange(label, [
      SPORTS_LABELS.find(v => v.label === firstOption),
      SPORTS_LABELS.find(v => v.label === secondOption),
    ]);
  }, [firstOption, secondOption]);

  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="w-[30%] text-center text-lg font-semibold text-red-900">
        {label?.label}
      </Text>
      <View className="flex w-[70%] flex-row px-1">
        <View className="w-[45%]">
          <Dropdown
            options={SPORTS_LABELS}
            selectedOption={firstOption}
            setSelectedOption={setFirstOption}
            label="Sports"
            style={DROPDOWN_STYLE}
          />
        </View>
        <Space size="w-[10%]" />
        <View className="w-[45%]">
          <Dropdown
            options={SPORTS_LABELS}
            selectedOption={firstOption}
            setSelectedOption={setFirstOption}
            label="Sports"
            style={DROPDOWN_STYLE}
          />
        </View>
      </View>
    </View>
  );
}
