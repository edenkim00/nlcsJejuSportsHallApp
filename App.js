import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginPage from './src/pages/LoginPage';
import BottomTab from './src/Navigation';
import SignUpPage from './src/pages/SignUpPage';
import PasswordPage from './src/pages/PasswordPage';

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
    BottomTab: {
      screen: BottomTab,
      navigationOptions: {
        title: 'Vote Application',
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
