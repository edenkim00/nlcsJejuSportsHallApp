import React, {useState, useEffect} from 'react';
import {LogBox, View, Text, Alert} from 'react-native';
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
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      const userInfoFromHelper = await Helper.getUserInfo();

      if (!userInfoFromHelper) {
        Alert.alert('Failed to fetch user info.');
        handleMoveToLogin();
        return;
      }
      if (userInfoFromHelper?.userId === 1) {
        setIsAdmin(true);
      }
      setUserInfo(userInfoFromHelper);
      setLoading(false);
    };
    fetchUserInfo();
  }, [handleMoveToLogin]);

  const initialParams = props?.route?.params;
  if (!initialParams) {
    return null;
  }
  const {handleMoveToLogin, categories} = initialParams;
  if (!handleMoveToLogin) {
    return null;
  }
  if (!categories?.length) {
    return null;
  }

  return (
    <>
      <View className="flex flex-col items-center justify-center h-full">
        {loading ? (
          <>
            <LoadingComponent />
          </>
        ) : (
          <View className="bottom-[10%] flex h-full flex-col items-center justify-end">
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
                <Button
                  label={'🔊 Report'}
                  onPress={() => {
                    setShowAdminModal(true);
                  }}
                  extraClassName={
                    'border-2 border-[#00AAAA] shadow-blue-900 shadow-lg mt-4 w-36 bg-transparent h-12 rounded-xl'
                  }
                  fontClassName={'font-normal text-lg font-semibold text-white'}
                />
              </>
            )}
            {handleMoveToLogin && (
              <>
                <Button
                  label={'Logout'}
                  onPress={async () => {
                    props?.route?.params?.handleMoveToLogin();
                    await Helper.handleLogout();
                  }}
                  extraClassName={
                    'border-2 border-[#BBBBFF] shadow-blue-900 shadow-lg mt-8 w-36 bg-transparent h-12 rounded-xl'
                  }
                  fontClassName={'font-normal text-lg font-semibold text-white'}
                />
                <Button
                  label={'Delete Account'}
                  onPress={async () => {
                    try {
                      await APIManager.deleteAccount();
                      await Helper.handleLogout();
                      props?.route?.params?.handleMoveToLogin();
                      Alert.alert('Successfully deleted account.');
                    } catch (err) {
                      Alert.alert(err?.message ?? 'Please retry later.');
                      return;
                    }
                  }}
                  extraClassName={
                    'border-2 border-[#AAAAAA] shadow-blue-900 shadow-lg w-36 bg-transparent h-12 rounded-xl my-3'
                  }
                  fontClassName={'font-normal text-xs font-semibold text-white'}
                />
              </>
            )}
          </View>
        )}
      </View>
      <AdminModal
        visible={showAdminModal}
        onSubmit={async ({email, category_id}) => {
          try {
            await APIManager.reportVoteResult(email, category_id);
            Alert.alert('Successfully requested.');
          } catch (err) {
            Alert.alert(err?.message ?? 'Please retry later.');
            return;
          }

          setShowAdminModal(false);
        }}
        onClose={() => {
          setShowAdminModal(false);
        }}
        categories={categories}
      />
    </>
  );
}
