import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Container from './components/Container';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

import HomeComponent from './pages/HomePage';
import ResultComponent from './pages/HelloReactNative';
import MypageComponent from './pages/MyPage';
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
  const handleMoveToLogin = () => {
    navigation.navigate('Login');
  };
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
        <Tab.Screen
          name="Home"
          component={withContainer(HomeComponent)}
          options={TABBAR_OPTION}
        />
        <Tab.Screen
          name="Result"
          component={withContainer(ResultComponent)}
          options={TABBAR_OPTION}
        />
        {/*
        <Tab.Screen
          name="Result"
          component={ResultComponent}
          options={{
            headerShown: false,
            tabBarStyle: {
              height: '10%',
              paddingHorizontal: '1%',
              paddingVertical: '1%',
              backgroundColor: '#303030',
              position: 'absolute',
              bottom: 0,
              borderTopWidth: 0,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              color: '#FFFFFF',
              marginBottom: '3.5%',
            },
          }}
        /> */}
        <Tab.Screen
          name="MyPage"
          component={withContainer(MypageComponent)}
          initialParams={{
            handleMoveToLogin,
          }}
          options={TABBAR_OPTION}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;

const withContainer = Component => {
  return props => {
    return (
      <Container>
        <Component {...props} />
      </Container>
    );
  };
};
