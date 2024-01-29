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
import LoadingComponent from '../Loading';

const NONE_LABEL = 'None';
export default function VoteModal({
  showVoteModal,
  setShowVoteModal,
  selectedVoteCategory,
  admin,
}) {
  const [voteData, setVoteData] = useState(
    Object.fromEntries(
      DAYS_AVAILABLE.map(day => [day, [NONE_LABEL, NONE_LABEL]]),
    ),
  );

  const onVoteSelectorChange = (key, value) => {
    setVoteData({...voteData, [key]: value});
  };

  function validateVoteData() {
    if (admin) {
      return !DAYS_AVAILABLE.map(day => {
        return (
          voteData &&
          voteData[day] &&
          voteData[day].length &&
          [...SPORTS_AVAILABLE].includes(voteData[day])
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

          {admin ? (
            <View className="flex w-full flex-col items-center justify-center">
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
                  {admin ? (
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
              const requestVote = async force => {
                if (admin) {
                  await APIManager.confirm({
                    category_id: selectedVoteCategory,
                    force: force || undefined,
                    confirmed_data: voteData,
                  });
                  Alert.alert('Success', 'Your confirm has been submitted.');
                } else {
                  await APIManager.vote({
                    category_id: selectedVoteCategory,
                    force: force || undefined,
                    vote_data: voteData,
                  });
                  Alert.alert('Success', 'Your vote has been submitted.');
                }
              };
              try {
                await requestVote();
              } catch (err) {
                err.message = err.message?.replace('Error: ', '');
                if (err.message === 'You already voted.') {
                  Alert.alert(
                    'You already voted.',
                    'Do you want to update your vote?',
                    [
                      {
                        text: 'Yes',
                        onPress: async () => {
                          try {
                            await requestVote(true);
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
    onChange(label, firstOption);
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
  voteName,
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
            {voteName}
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
                          <Text className="text-center">{voteResult[day]}</Text>
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
