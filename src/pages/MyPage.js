/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {LogBox, View, Text} from 'react-native';
import APIManager from '../api';
import Space from '../components/Space';
import Button from '../components/Button';
import LoadingComponent from '../components/Loading';
import AdminModal from '../components/AdminModal';
import Helper from '../helper';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Non-serializable values were found in the navigation state. Check:',
]);

export default function MyPage(props) {
  const handleMoveToLogin = props?.route?.params?.handleMoveToLogin;
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);

      const userInfoFromHelper = await Helper.getUserInfo();
      if (!userInfoFromHelper) {
        return;
      }
      if (userInfoFromHelper?.userId === 1) {
        setIsAdmin(true);
      }
      setUserInfo(userInfoFromHelper);
      setLoading(false);
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <View className="flex flex-col items-center justify-center">
        {loading ? (
          <LoadingComponent />
        ) : (
          <View className="flex h-full flex-col items-center justify-center">
            <Space size="h-36" />
            {userInfo && (
              <>
                <Text className="text-2xl font-bold text-white">
                  Welcome,
                  <Space size="w-1" />
                  <Text className="text-green-400">{userInfo.name} 🔥</Text>
                </Text>
                <Space size="h-6" />
                <Text className="text-lg font-semibold text-white">
                  Choose your preferred exercise freely!
                </Text>
              </>
            )}

            {isAdmin && (
              <>
                <Space size="h-18" />
                <Button
                  label={'🔊 Report'}
                  onPress={() => {
                    setShowAdminModal(true);
                  }}
                  extraClassName={
                    'border-2 border-[#00AAAA] shadow-blue-900 shadow-lg mt-8 w-36 bg-transparent h-12 rounded-xl'
                  }
                  fontClassName={'font-normal text-lg font-semibold text-white'}
                />
              </>
            )}
            {handleMoveToLogin && (
              <Button
                label={'Logout'}
                onPress={async () => {
                  props?.route?.params?.handleMoveToLogin();
                  await Helper.handleLogout();
                }}
                extraClassName={
                  'border-2 border-[#BBBBFF] shadow-blue-900 shadow-lg mt-8 w-36 bg-transparent h-12 rounded-xl absolute bottom-36'
                }
                fontClassName={'font-normal text-lg font-semibold text-white'}
              />
            )}
          </View>
        )}
      </View>
      <AdminModal
        visible={showAdminModal}
        onSubmit={async ({email, year, month}) => {
          await APIManager.reportVoteResult(email, year, month);
          setShowAdminModal(false);
        }}
        onClose={() => {
          setShowAdminModal(false);
        }}
      />
    </>
  );
}
