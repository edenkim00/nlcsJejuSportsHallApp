import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { LogBox, ImageBackground, TouchableOpacity, View, Text, Button, Alert, Modal, TextInput } from 'react-native';
import { userInfo } from './api/UserInfo';
import { sendEmailToAdminAPI } from './api/sendEmail';
import { styles, myPageStyles, modalStyles } from './styles';
import { ScrollView } from 'react-native-gesture-handler';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Non-serializable values were found in the navigation state. Check:'
]);

function MypageComponent({ navigation, route }) {
  const rootNavigation = route.params.rootNavigation
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminModalShow, setAdminModalShow] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminYear, setAdminYear] = useState('');
  const [adminMonth, setAdminMonth] = useState('');

  const sendEmailToAdmin = async () => {
    try {
      // TODO: validation
      const apiResult = await sendEmailToAdminAPI(adminEmail, adminYear, adminMonth);
      console.log(apiResult)
      if (apiResult.code !== 1000) {
        Alert.alert('Please try again later.')
        return;
      }
      Alert.alert('Email sent successfully.');
    } catch {
      Alert.alert('Please try again later.')
      return;
    }
  }
  const handleLogout = async () => {
    rootNavigation.navigate('Login');
  }
  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        let [userName, userGrade] = await Promise.all([AsyncStorage.getItem('sportshall_userName'), AsyncStorage.getItem('sportshall_userGrade')]);
        if (userName && userGrade) {
          setName(userName);
          setGrade(userGrade);
          setLoading(false);
          return;
        }
        const userInfoData = await userInfo();
        if (!userInfoData) {
          Alert.alert("Auth Failed. Please re-login.");
          return
        }
        if (userInfoData.code !== 1000) {
          Alert.alert("Connection error. Please retry later.");
          return
        }

        userName = userInfoData.result.name
        userGrade = userInfoData.result.grade
        await Promise.all([AsyncStorage.setItem('sportshall_userName', userName), AsyncStorage.setItem('sportshall_userGrade', userGrade)])
        setName(userName);
        setGrade(userGrade);
        setLoading(false);
      } catch (err) {
        Alert.alert('Please try again later.')
        navigation.navigate('Home');
      }
    }
    fetchUserInfo()
    const email = (AsyncStorage.getItem('sportshall_email')).then(email => {
      if (email === 'admin@pupils.nlcsjeju.kr') {
        setIsAdmin(true);
      }
      console.log("EMAIL", email)

    });

  }, []);

  return (
    loading ?
      <ImageBackground source={require('../assets/backgrounds.jpg')} style={styles.bottomTabContainer} >
        <Text style={styles.title1}>Sports Hall</Text>
        <Text style={styles.title2}>VOTING SYSTEM</Text>
        <Text style={styles.title3}>@NLCS JEJU</Text>
        <Text style={myPageStyles.text_loading}>Loading...</Text>
      </ImageBackground>
      :
      <ImageBackground source={require('../assets/backgrounds.jpg')} style={styles.bottomTabContainer} >
        <Text style={styles.title1}>Sports Hall</Text>
        <Text style={styles.title2}>VOTING SYSTEM</Text>
        <Text style={styles.title3}>@NLCS JEJU</Text>
        {
          isAdmin && (
            <TouchableOpacity style={myPageStyles.admin_button} onPress={() => setAdminModalShow(true)}>
              <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', padding: '3%' }}>🗣️ Voting Result (admin)</Text>
            </TouchableOpacity>
          )
        }
        <View style={{ marginTop: '12.5%' }}></View>
        <Text style={myPageStyles.text}>Name:    {name}</Text>
        <Text style={myPageStyles.text}>Grade:    {grade}</Text>
        <View style={{ marginTop: '7.5%' }}></View>
        <View style={myPageStyles.logout_button}>
          <Button title="Logout" onPress={handleLogout} color='#FFFFFF' />
        </View>
        <AdminModal visible={adminModalShow} onClose={() => setAdminModalShow(false)} onSubmit={sendEmailToAdmin} setAdminEmail={setAdminEmail} setAdminYear={setAdminYear} setAdminMonth={setAdminMonth} adminEmail={adminEmail} adminYear={adminYear} adminMonth={adminMonth} />
      </ImageBackground>
  );
}

export default MypageComponent;

const AdminModal = ({ visible, onClose, onSubmit, adminEmail, setAdminEmail, adminYear, setAdminYear, adminMonth, setAdminMonth }) => {
  return (
    <Modal visible={visible} transparent animationType='slide' >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <Text style={{ textAlign: 'center', fontSize: 18, color: 'darkblue', marginBottom: '3%' }}>Your Email</Text>
          <ScrollView>
            <TextInput
              style={myPageStyles.input}
              value={adminEmail}
              onChangeText={(text) => setAdminEmail(text)}
            />
            <Text style={{ textAlign: 'center', fontSize: 18, color: 'darkblue', marginBottom: '3%' }}>Year (ex: 2023)</Text>
            <TextInput
              style={myPageStyles.input}
              value={adminYear}
              onChangeText={(text) => setAdminYear(text)}
            />
            <Text style={{ textAlign: 'center', fontSize: 18, color: 'darkblue', marginBottom: '3%' }}>Month (1~12)</Text>
            <TextInput
              style={myPageStyles.input}
              value={adminMonth}
              onChangeText={(text) => setAdminMonth(text)}
            />
          </ScrollView>
          <View style={{ 'flexDirection': 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={modalStyles.closeButton} onPress={async () => { await onSubmit(); }}>
              <Text style={modalStyles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
              <Text style={modalStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}