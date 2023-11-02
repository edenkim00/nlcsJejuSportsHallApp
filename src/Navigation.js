import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeComponent from './pages/HomePage';
import MypageComponent from './pages/MyPage';
import ResultComponent from './pages/Result';
import Icon from 'react-native-vector-icons/Entypo';
import {NavigationContainer} from '@react-navigation/native';
// import {Dimensions} from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  // const screenHeight = Dimensions.get('window').height;
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => {
            if (route.name === 'Home') {
              return <Icon name="home" color={color} size={25} />;
            } else if (route.name === 'MyPage') {
              return <Icon name="user" color={color} size={25} />;
            }
            return <Icon name="calendar" color={color} size={25} />;
          },
          tabBarInactiveTintColor: '#999999',
          tabBarActiveTintColor: '#FFFFFF',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeComponent}
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
        />
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
        />
        <Tab.Screen
          name="MyPage"
          component={MypageComponent}
          initialParams={{rootNavigation: navigation}}
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
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;
