/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Space from '../components/Space';
import MonthPicker from 'react-native-month-year-picker';
import InfoModal from '../components/InfoModal';
import VoteModal from '../components/VoteModal';

export default function HomePage() {
  const today = new Date();
  const aWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const [selectedYear, setSelectedYear] = useState(aWeekLater.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(aWeekLater.getMonth() + 2);

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  return (
    <>
      <View className="flex h-full w-full flex-col items-center justify-center">
        <Space size="h-32" />
        <View className="flex w-full flex-row justify-end">
          <TouchableOpacity
            className="right-[5%] flex flex-row items-center justify-center rounded-xl border border-green-300 px-5 py-4"
            onPress={() => {
              setShowInfoModal(true);
            }}>
            <View>
              <Text className="text-center text-white">🗣️ Learning</Text>
              <Text className="text-center text-white">Voting Polices</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Space size="h-16" />
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
              setShowVoteModal(true);
            }}>
            <Text className="text-center text-xl font-semibold text-white">
              Select Sports
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modals
        {...{
          showInfoModal,
          showMonthPicker,
          showVoteModal,
          selectedYear,
          setSelectedYear,
          selectedMonth,
          setSelectedMonth,
          setShowInfoModal,
          setShowMonthPicker,
          setShowVoteModal,
        }}
      />
    </>
  );
}

function Modals({
  showInfoModal,
  setShowInfoModal,
  showMonthPicker,
  setShowMonthPicker,
  showVoteModal,
  setShowVoteModal,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
}) {
  const today = new Date();
  const aWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const year = aWeekLater.getFullYear();
  const month = aWeekLater.getMonth() + 1;

  return (
    <>
      {showMonthPicker && (
        <View className="bottom-[8%] z-auto w-full">
          <MonthPicker
            onChange={(event, newDate) => {
              if (event === 'dateSetAction') {
                if (newDate && newDate?.getFullYear() && newDate?.getMonth()) {
                  setSelectedYear(newDate?.getFullYear());
                  setSelectedMonth(newDate?.getMonth() + 1);
                }
              }
              setShowMonthPicker(false);
            }}
            minimumDate={new Date(year, month)}
            maximumDate={new Date(year + 1, 12)}
            value={new Date(selectedYear, selectedMonth)}
            locale="ko"
            mode="spinner"
          />
        </View>
      )}
      {showInfoModal && (
        <InfoModal
          {...{
            showInfoModal,
            setShowInfoModal,
          }}
        />
      )}
      {showVoteModal && (
        <VoteModal
          {...{
            showVoteModal,
            setShowVoteModal,
          }}
        />
      )}
    </>
  );
}
