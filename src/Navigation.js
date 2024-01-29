import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Container from './components/Container';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

import HomeComponent from './pages/HomePage';
import ResultComponent from './pages/Result';
import MypageComponent from './pages/MyPage';
import Helper from './helper';
import {USER_INFO_FILEDS} from './helper/constants';
import APIManager from './api';
import {Alert} from 'react-native';
import LoadingComponent from './components/Loading';
import Button from './components/Button';
const Tab = createBottomTabNavigator();
const TABBAR_OPTION = {
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    height: '8%',
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    backgroundColor: '#303030',
    bottom: 0,
    borderTopWidth: 0,
    zIndex: 100,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    color: '#FFFFFF',
    bottom: '-30%',
    position: 'absolute',
  },
};

function MyTabs({navigation}) {
  const [ready, setReady] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleMoveToLogin = async () => {
    await Helper.handleLogout();
    navigation.navigate('Login');
  };

  const fetchCategories = async () => {
    try {
      const graduationYear = await Helper.get(USER_INFO_FILEDS.GRADUATION_YEAR);
      console.log(graduationYear);
      if (!graduationYear) {
        throw new Error('You cannot access this page now. Please retry later.');
      }
      const categories = await APIManager.getVoteCategories(graduationYear);
      if (!Array.isArray(categories)) {
        throw new Error('You cannot access this page now. Please retry later.');
      }
      setCategories(categories);
      setReady(true);
    } catch (err) {
      Alert.alert('You cannot access this page now. Please retry later.');
      handleMoveToLogin();
      return;
    }
  };

  const forbidden = async () => {
    const userId = await Helper.get(USER_INFO_FILEDS.USER_ID);
    console.log('INIT: ', userId);
    if (!userId) {
      Alert.alert('You cannot access this page now. Please login again.');

      handleMoveToLogin();
      return;
    }
  };

  useEffect(() => {
    forbidden();
    fetchCategories();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => {
            if (route.name === 'Home') {
              return <Icon name="home" color={color} size={20} />;
            } else if (route.name === 'MyPage') {
              return <Icon name="user" color={color} size={20} />;
            }
            return <Icon name="calendar" color={color} size={20} />;
          },
          tabBarInactiveTintColor: '#999999',
          tabBarActiveTintColor: '#FFFFFF',
        })}>
        {ready ? (
          <>
            <Tab.Screen
              name="Home"
              component={withContainer(HomeComponent)}
              initialParams={{
                categories,
              }}
              options={TABBAR_OPTION}
            />
            <Tab.Screen
              name="Result"
              component={withContainer(ResultComponent)}
              initialParams={{categories}}
              options={TABBAR_OPTION}
            />
            <Tab.Screen
              name="MyPage"
              component={withContainer(MypageComponent)}
              initialParams={{
                categories,
                handleMoveToLogin,
              }}
              options={TABBAR_OPTION}
            />
          </>
        ) : (
          <Tab.Screen
            name="Loading..."
            component={withContainer(LoadingView)}
            initialParams={{
              handleLogout: handleMoveToLogin,
            }}
            options={TABBAR_OPTION}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;

const LoadingView = props => {
  return (
    <>
      <LoadingComponent />
      <Button
        label={'Logout'}
        onPress={async () => {
          const logout = props?.route?.params?.handleLogout;
          await Helper.handleLogout();
          if (logout) {
            logout();
          } else {
            Alert.alert('Logout failed. Please re-boot the app.');
          }
        }}
        extraClassName={
          'border-2 border-[#BBBBFF] shadow-blue-900 shadow-lg mt-8 w-36 bg-transparent h-12 rounded-xl absolute bottom-40'
        }
        fontClassName={'font-normal text-lg font-semibold text-white'}
      />
    </>
  );
};
const withContainer = Component => {
  return props => {
    return (
      <Container>
        <Component {...props} />
      </Container>
    );
  };
};
