import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginPage from './src/LoginPage';
import BottomTab from './src/Navigation';
import SignUpPage1 from './src/SignUpPage1';
import SignUpPage2 from './src/SignUpPage2';
import PasswordPage1 from './src/PasswordPage1';
import PasswordPage2 from './src/PasswordPage2';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginPage,
      navigationOptions: {
        title: 'Login',
      },
    },
    SignUpPage1: {
      screen: SignUpPage1,
      navigationOptions: {
        title: 'Signup',
      },
    },
    SignUpPage2: {
      screen: SignUpPage2,
      navigationOptions: {
        title: 'Signup',
      },
    },
    PasswordPage1: {
      screen: PasswordPage1,
      navigationOptions: {
        title: 'Password',
      },
    },
    PasswordPage2: {
      screen: PasswordPage2,
      navigationOptions: {
        title: 'Password',
      },
    },
    BottomTab: {
      screen: BottomTab,
      navigationOptions: {
        title: 'Vote Application',
      },
    },
  },
  {
    initialRouteName: 'BottomTab',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
