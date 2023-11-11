/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  DAYS_AVAILABLE,
  SPORTS_AVAILABLE,
  DROPDOWN_BUTTON_TEXT_STYLE,
  DROPDOWN_STYLE,
} from './constants';
import Dropdown from '../Dropdown';
import APIManager from '../../api';
import Helper from '../../helper';
import LoadingComponent from '../Loading';

const NONE_LABEL = 'None';
export default function VoteModal({
  showVoteModal,
  setShowVoteModal,
  selectedYear,
  selectedMonth,
  isAdmin,
}) {
  const [voteData, setVoteData] = useState(
    Object.fromEntries(
      DAYS_AVAILABLE.map(day => [day, [NONE_LABEL, NONE_LABEL]]),
    ),
  );

  const [selectedGrade, setSelectedGrade] = useState();
  const onVoteSelectorChange = (key, value) => {
    setVoteData({...voteData, [key]: value});
  };

  function validateVoteData() {
    if (isAdmin) {
      if (!selectedGrade) {
        return false;
      }
      return !DAYS_AVAILABLE.map(day => {
        return (
          voteData &&
          voteData[day] &&
          voteData[day].length &&
          [...SPORTS_AVAILABLE].includes(voteData[day][0])
        );
      }).some(x => !x);
    }
    return !DAYS_AVAILABLE.map(day => {
      return (
        voteData &&
        voteData[day] &&
        voteData[day].length === 2 &&
        [...SPORTS_AVAILABLE, 'None'].includes(voteData[day][0]) &&
        [...SPORTS_AVAILABLE, 'None'].includes(voteData[day][1]) &&
        (voteData[day][0] !== voteData[day][1] || voteData[day][0] === 'None')
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

          {isAdmin ? (
            <View className="flex flex-col w-full justify-centers items-center">
              <View className="flex w-[80%] flex-col">
                <Text className="mb-1 text-center text-lg font-semibold text-purple-800">
                  Grade
                </Text>
                <Dropdown
                  options={['MS', 'HS']}
                  setSelectedOption={setSelectedGrade}
                  dropdownStyle={DROPDOWN_STYLE}
                  buttonStyle={DROPDOWN_STYLE}
                  buttonLabelStyle={DROPDOWN_BUTTON_TEXT_STYLE}
                />
              </View>
              <Space size="h-8" />
              <AdminHeader />
            </View>
          ) : (
            <Header />
          )}
          <ScrollView className="h-3/4">
            <Space size="h-5" />
            {DAYS_AVAILABLE.map((day, index) => {
              return (
                <View key={index}>
                  {isAdmin ? (
                    <AdminSelector
                      label={day}
                      onChange={onVoteSelectorChange}
                    />
                  ) : (
                    <VoteSelector label={day} onChange={onVoteSelectorChange} />
                  )}
                  <Space size="h-3" />
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View className="absolute bottom-2 right-6 flex h-[10%] flex-row">
          <TouchableOpacity
            onPress={async () => {
              if (!validateVoteData()) {
                Alert.alert('Invalid Vote Data', 'Please check your vote data');
                return;
              }
              try {
                const userInfo = await Helper.getUserInfo();
                if (!userInfo?.graduationYear) {
                  throw new Error('User info not found');
                }
                console.log('voteData', voteData);

                const response = await APIManager.vote({
                  voteData,
                  year: selectedYear,
                  month: selectedMonth,
                  graduationYear: userInfo?.graduationYear,
                  gradeSelectedByAdmin: selectedGrade,
                });

                if (response?.code === 1000) {
                  Alert.alert('Success', 'Your vote has been submitted');
                } else if (response?.code === 5001) {
                  Alert.alert(
                    'Failed to submit vote',
                    'You have already voted. Do you want to update your vote?',
                    [
                      {
                        text: 'Yes',
                        onPress: async () => {
                          try {
                            const newResponse = await APIManager.voteChange({
                              voteData,
                              year: selectedYear,
                              month: selectedMonth,
                              graduationYear: userInfo?.graduationYear,
                              gradeSelectedByAdmin: selectedGrade,
                            });
                            console.log(newResponse);
                            if (newResponse.code === 1000) {
                              Alert.alert(
                                'Success',
                                'Your vote has been updated',
                              );
                              return;
                            } else {
                              Alert.alert(
                                'Failed to submit vote',
                                'Something went wrong. Please try again later.',
                              );
                              return;
                            }
                          } catch (e) {
                            Alert.alert(
                              'Failed to submit vote',
                              'Something went wrong. Please try again later.',
                            );
                            return;
                          }
                        },
                      },
                      {
                        text: 'No',
                        onPress: () => {},
                      },
                    ],
                  );
                } else {
                  Alert.alert(
                    'Failed to submit vote',
                    'Something went wrong. Please try again later.',
                  );
                }
              } catch (e) {
                Alert.alert(
                  'Failed to submit vote',
                  'Something went wrong. Please try again later.',
                );
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

function AdminHeader() {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="w-[30%] text-center text-lg font-semibold text-red-900">
        Day
      </Text>
      <Space size="w-[5%]" />
      <View className="flex w-[65%] flex-row px-1">
        <Text className="w-full text-center text-lg font-semibold text-purple-800">
          Sport
        </Text>
      </View>
    </View>
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

function ResultHeader() {
  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="w-[35%] text-center text-lg font-semibold text-red-900">
        Day
      </Text>
      <Space size="w-[5%]" />
      <View className="flex w-[60%] flex-row px-1">
        <Text className="w-full text-center text-lg font-semibold text-purple-800">
          Sport
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

  const [firstOption, setFirstOption] = useState(NONE_LABEL);
  const [secondOption, setSecondOption] = useState(NONE_LABEL);

  useEffect(() => {
    setFirstSportsOptions([
      ...SPORTS_AVAILABLE.filter(
        sport => sport !== secondOption && sport !== NONE_LABEL,
      ),
    ]);
    onChange(label, [firstOption, secondOption]);
  }, [secondOption]);

  useEffect(() => {
    setSecondSportsOptions([
      ...SPORTS_AVAILABLE.filter(
        sport => sport !== firstOption && sport !== NONE_LABEL,
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

function AdminSelector({label, onChange}) {
  const [firstSportsOptions, setFirstSportsOptions] = useState([
    ...SPORTS_AVAILABLE,
  ]);

  const [firstOption, setFirstOption] = useState(NONE_LABEL);

  useEffect(() => {
    onChange(label, [firstOption]);
  }, [firstOption]);

  return (
    <View className="flex flex-row items-center justify-between">
      <Text className="w-[30%] text-center font-semibold text-green-800">
        {label}
      </Text>
      <Space size="w-[5%]" />
      <View className="flex w-[65%] flex-row px-1">
        <SportSelector
          availableSports={firstSportsOptions}
          onChange={setFirstOption}
        />
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

export function VoteResultModal({
  selectedYear,
  selectedMonth,
  showVoteResultModal,
  setShowVoteResultModal,
  voteResult,
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (voteResult) {
      setLoading(false);
    }
  }, [voteResult]);

  return (
    <Modal visible={showVoteResultModal} transparent animationType="slide">
      <View className="absolute bottom-1/4 left-[12.5%] h-1/2 w-3/4 rounded-xl bg-[#FFFFFFDD] px-6 pt-8">
        <View className="h-[90%] pb-2">
          <Text className="h-[10%] text-center text-lg font-bold text-blue-700">
            🗳️ Vote Result
          </Text>
          <Text className="text-center font-bold text-green-600">
            {selectedYear} - {selectedMonth}
          </Text>
          {loading && voteResult !== undefined ? (
            <LoadingComponent />
          ) : (
            <>
              <Space size="h-4" />
              <ResultHeader />
              <ScrollView className="h-3/4">
                <Space size="h-5" />
                {DAYS_AVAILABLE.map((day, index) => {
                  return (
                    <View key={index}>
                      <View className="flex w-full flex-row items-center justify-center text-center">
                        <View className="w-[35%]">
                          <Text className="text-center">{day}</Text>
                        </View>
                        <Space size="w-[5%]" />
                        <View className="w-[60%]">
                          <Text className="text-center">
                            {voteResult[day]?.['1']}
                          </Text>
                        </View>
                      </View>
                      <Space size="h-5" />
                    </View>
                  );
                })}
              </ScrollView>
            </>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowVoteResultModal(false);
          }}>
          <View className="flex flex-row items-end justify-end pb-8">
            <Space size="w-4" />
            <Text className="text-center text-lg font-semibold text-green-900">
              Close
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
