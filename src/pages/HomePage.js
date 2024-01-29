/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Space from '../components/Space';
import InfoModal from '../components/InfoModal';
import VoteModal from '../components/VoteModal';
import Helper from '../helper';
import {USER_INFO_FILEDS} from '../helper/constants';
import {isAdmin} from '../lib/utils';
import {CategorySelector} from '../components/Dropdown';

export default function HomePage(props) {
  const [admin, setAdmin] = useState(false);
  const [selectedVoteCategory, setSelectedVoteCategory] = useState(undefined);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const initialParams = props?.route?.params;
  if (!initialParams) {
    return null;
  }

  const {fetchCategories, handleMoveToLogin, categories} = initialParams;
  if (!fetchCategories) {
    if (handleMoveToLogin) {
      handleMoveToLogin(true);
      return;
    }
    return null;
  }

  useEffect(() => {
    async function checkIsAdmin() {
      const userId = await Helper.get(USER_INFO_FILEDS.USER_ID);
      if (!userId) {
        if (handleMoveToLogin) {
          handleMoveToLogin(true);
          return;
        }
        return null;
      }
      setAdmin(isAdmin(userId));
    }
    checkIsAdmin();
  }, []);

  return (
    <>
      <View className="flex h-full w-full flex-col items-center justify-center">
        <Space size="h-32" />
        <View className="flex h-[9%] w-full flex-row justify-end">
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
              if (!selectedVoteCategory) {
                Alert.alert('Please select category');
                return;
              }
              setShowVoteModal(true);
            }}>
            <Text className="text-center text-xl font-semibold text-white">
              {admin ? 'Confirm' : 'Select Sports'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modals
        {...{
          categories,
          showCategoryPicker,
          showInfoModal,
          setShowInfoModal,
          showVoteModal,
          setShowVoteModal,
          selectedVoteCategory,
          setSelectedVoteCategory,
          admin,
        }}
      />
    </>
  );
}

function Modals({
  showInfoModal,
  selectedVoteCategory,
  setShowInfoModal,
  showVoteModal,
  setShowVoteModal,
  admin,
}) {
  return (
    <>
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
            selectedVoteCategory,
            showVoteModal,
            setShowVoteModal,
            admin,
          }}
        />
      )}
    </>
  );
}
