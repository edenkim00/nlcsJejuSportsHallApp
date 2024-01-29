/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Space from '../components/Space';
import MonthPicker from 'react-native-month-year-picker';
import APIManager from '../api';
import Helper from '../helper';
import {VoteResultModal} from '../components/VoteModal';
import {CategorySelector} from '../components/Dropdown';

export default function ResultPage(props) {
  const initialParams = props?.route?.params;
  if (!initialParams) {
    console.log('initialParams is undefined');
    return null;
  }
  const {handleMoveToLogin, categories} = initialParams;
  if (!handleMoveToLogin) {
    console.log('handleMoveToLogin is undefined');
    return null;
  }
  if (!categories?.length) {
    console.log('categories is undefined');
    return null;
  }

  const [showVoteResultModal, setShowVoteResultModal] = useState(false);
  const [selectedVoteCategory, setSelectedVoteCategory] = useState(undefined);
  const [voteResult, setVoteResult] = useState(null);

  const fetchVoteResult = async () => {
    try {
      if (!selectedVoteCategory) {
        Alert.alert('Please select category');
        return;
      }
      const response = await APIManager.getConfirmedResult(
        selectedVoteCategory,
      );
      console.log(response);
      setVoteResult(response);
      setShowVoteResultModal(true);
    } catch (err) {
      err.message?.replace('Error: ', '') ?? 'Please retry later.';
      Alert.alert(err.message);
      setShowVoteResultModal(false);
      return;
    }
  };

  return (
    <>
      <View className="flex h-full w-full flex-col items-center justify-center">
        <Space size="h-48" />
        <Space size="h-[9%]" />

        <Space size="h-4" />
        <View className="absolute bottom-[30%] flex w-full justify-center">
          <Text className="text-center text-lg font-semibold text-yellow-300">
            Voting Type
          </Text>
          <CategorySelector
            {...{
              categories,
              setSelectedCategory: setSelectedVoteCategory,
            }}
          />
        </View>
        <Space size="h-4" />
        <View className="absolute bottom-[15%] left-[20%] flex w-full flex-row">
          <TouchableOpacity
            className="w-[60%] justify-center rounded-xl border-2 border-[#00FFFF] px-8 py-2 shadow-lg shadow-blue-100"
            onPress={() => {
              fetchVoteResult();
            }}>
            <Text className="text-center text-xl font-semibold text-white">
              Check Results
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modals
        {...{
          showVoteResultModal,
          setShowVoteResultModal,
          voteResult,
          voteName:
            categories?.find(category => category.id === selectedVoteCategory)
              ?.name ?? 'Unknown',
        }}
      />
    </>
  );
}

function Modals({
  showVoteResultModal,
  setShowVoteResultModal,
  voteResult,
  voteName,
}) {
  return (
    <>
      {showVoteResultModal && (
        <VoteResultModal
          {...{
            voteName,
            showVoteResultModal,
            setShowVoteResultModal,
            voteResult,
          }}
        />
      )}
    </>
  );
}
