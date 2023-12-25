import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Space from '../components/Space';
import MonthPicker from 'react-native-month-year-picker';
import APIManager from '../api';
import Helper from '../helper';
import {VoteResultModal} from '../components/VoteModal';

export default function ResultPage() {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showVoteResultModal, setShowVoteResultModal] = useState(false);

  const [voteResult, setVoteResult] = useState(null);
  const fetchVoteResult = async () => {
    try {
      const userInfo = await Helper.getUserInfo();
      if (!userInfo?.grade) {
        Alert.alert('Something went wrong. Please try again later.');
        return;
      }
      const response = await APIManager.getVotingResult(
        userInfo.grade,
        selectedYear,
        selectedMonth,
      );
      if (response.code !== 1000) {
        if (response.code === 8003) {
          Alert.alert(
            "Admin don't confirm the voting result yet. Please contact to admin.",
          );
          return;
        }
        Alert.alert('Something went wrong. Please try again later.');
        return;
      }

      setVoteResult(response.result);
      setShowVoteResultModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View className="flex h-full w-full flex-col items-center justify-center">
        <Space size="h-48" />
        <Space size="h-[9%]" />
        <Text className="text-xl font-semibold text-yellow-300">
          Year and Month
        </Text>
        <Space size="h-4" />
        <TouchableOpacity
          className="flex w-3/4 flex-row justify-center border border-white px-8 py-2 shadow-2xl shadow-yellow-100"
          onPress={() => {
            setShowMonthPicker(true);
          }}>
          <Text className="text-center text-lg font-semibold text-white">
            {selectedYear}-{selectedMonth} ▽
          </Text>
        </TouchableOpacity>
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
          showMonthPicker,
          showVoteResultModal,
          selectedYear,
          setSelectedYear,
          selectedMonth,
          setSelectedMonth,
          setShowMonthPicker,
          setShowVoteResultModal,
          voteResult,
        }}
      />
    </>
  );
}

function Modals({
  showMonthPicker,
  setShowMonthPicker,
  showVoteResultModal,
  setShowVoteResultModal,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  voteResult,
}) {
  return (
    <>
      {showMonthPicker && (
        <View className="bottom-[8%] z-auto w-full">
          <MonthPicker
            onChange={(event, newDate) => {
              setShowMonthPicker(false);
              if (event === 'dateSetAction') {
                if (
                  newDate &&
                  newDate?.getFullYear() &&
                  newDate?.getMonth() !== undefined
                ) {
                  if (Date.now() < newDate.getTime()) {
                    Alert.alert('Not allowed');
                    setShowMonthPicker(false);
                    return;
                  }
                  setSelectedYear(newDate?.getFullYear());
                  setSelectedMonth(newDate?.getMonth() + 1);
                }
              }
            }}
            minimumDate={new Date(2023, 0)}
            // maximumDate={new Date(year, month)}
            value={new Date(selectedYear, selectedMonth)}
            locale="ko"
            mode="spinner"
          />
        </View>
      )}

      {showVoteResultModal && (
        <VoteResultModal
          {...{
            selectedYear,
            selectedMonth,
            showVoteResultModal,
            setShowVoteResultModal,
            voteResult,
          }}
        />
      )}
    </>
  );
}
