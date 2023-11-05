import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginPage from './src/pages/LoginPage';
import BottomTab from './src/Navigation';
import SignUpPage from './src/pages/SignUpPage';
import PasswordPage from './src/pages/PasswordPage';
// import PasswordPage2 from './src/pages/PasswordPage2';

import HelloReactNativePage from './src/pages/HelloReactNative';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginPage,
      navigationOptions: {
        title: 'Login',
      },
    },
    SignUpPage: {
      screen: SignUpPage,
      navigationOptions: {
        title: 'Signup',
      },
    },

    PasswordPage: {
      screen: PasswordPage,
      navigationOptions: {
        title: 'Password',
      },
    },
    // PasswordPage2: {
    //   screen: PasswordPage2,
    //   navigationOptions: {
    //     title: 'Password',
    //   },
    // },
    BottomTab: {
      screen: BottomTab,
      navigationOptions: {
        title: 'Vote Application',
      },
    },

    MyPage: {
      screen: HelloReactNativePage,
      navigationOptions: {
        title: 'My Page',
      },
    },
    HelloReactNative: {
      screen: HelloReactNativePage,
      navigationOptions: {
        title: 'Hello React Native',
      },
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
