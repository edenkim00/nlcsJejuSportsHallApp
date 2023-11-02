import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  bottomTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    maxHeight: '90%',
  },

  title1: {
    color: 'white',
    position: 'absolute',
    top: '10%',
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    color: 'white',
    position: 'absolute',
    top: '22%',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title3: {
    color: 'white',
    position: 'absolute',
    top: '26%',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const loginPageStyles = StyleSheet.create({
  label: {
    color: 'yellow',
    marginBottom: '2%',
    fontSize: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: '3%',
    fontSize: 15,
    width: '80%',
    marginBottom: '5%',
  },

  button: {
    marginTop: '8%',
    borderColor: '#00FFFF',
    width: '30%',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
  },

  button_forgotPassword: {
    marginTop: '8%',
    marginLeft: '5%',
    borderColor: '#AAFF',
    width: '30%',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
  },

  button_signup: {
    marginTop: '5%',
    marginBottom: '10%',
    borderColor: '#AABBCC',
    width: '65%',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
  },
});

const signUpPageStyles = StyleSheet.create({
  label: {
    color: 'yellow',
    marginBottom: '2%',
    fontSize: 20,
  },
  small_label: {
    color: 'yellow',
    marginBottom: '2%',
    fontSize: 15,
  },

  password_label: {
    color: 'yellow',
    marginBottom: '2%',
    fontSize: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: '2%',
    fontSize: 15,
    width: '80%',
    marginHorizontal: '2%',
    marginBottom: '5%',
  },

  small_input: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: '2%',
    fontSize: 15,
    width: '60%',
    marginBottom: '5%',
  },

  button: {
    marginTop: '8%',
    marginBottom: '10%',
    borderColor: '#00FFFF',
    width: '30%',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
  },

  right_button: {
    marginBottom: '5%',
    marginLeft: '3%',
    justifyContent: 'center',
    borderColor: '#AAFF',
    width: '20%',
    borderWidth: 2,
    borderRadius: 10,
  },
});

const forgotPasswordPageStyles = StyleSheet.create({
  label: {
    color: 'yellow',
    marginBottom: '2%',
    fontSize: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: '2%',
    fontSize: 15,
    width: '80%',
    marginHorizontal: '2%',
    marginBottom: '5%',
  },

  small_input: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: '2%',
    fontSize: 15,
    width: '60%',
    marginBottom: '5%',
  },

  button: {
    marginTop: '7%',
    marginBottom: '10%',
    borderColor: '#00FFFF',
    width: '30%',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
  },

  right_button: {
    marginBottom: '5%',
    marginLeft: '3%',
    justifyContent: 'center',
    borderColor: '#AAFF',
    width: '20%',
    borderWidth: 2,
    borderRadius: 10,
  },
});

const homePageStyles = StyleSheet.create({
  select_sports_button: {
    width: '60%',
    marginTop: '10%',
    marginBottom: '10%',
    borderColor: '#00FFFF',
    borderWidth: 2,
    borderRadius: 10,
  },
  info_button: {
    width: '30%',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: '52%',
    marginTop: '5%',
    marginRight: '1%',
    borderColor: '#00FF00',
    borderWidth: 1,
    borderRadius: 10,
  },

  label: {
    color: 'yellow',
    marginBottom: '1%',
    fontSize: 20,
    width: '40%',
    marginHorizontal: '3%',
    textAlign: 'center',
  },
  year_and_month: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 15,
    color: 'white',
    padding: '2.5%',
    marginHorizontal: '3%',
    textAlign: 'center',
    marginTop: '2%',
    marginBottom: '5%',
  },
  week: {
    borderColor: 'white',
    borderWidth: 1,
    width: '80%',
    textAlign: 'center',
    marginHorizontal: '3%',
    marginTop: '2%',
    marginBottom: '5%',
  },
});

const resultPageStyles = StyleSheet.create({
  button: {
    width: '60%',
    marginTop: '10%',
    marginBottom: '10%',
    borderColor: '#00FFFF',
    borderWidth: 2,
    borderRadius: 10,
  },

  label: {
    color: 'yellow',
    marginBottom: '1%',
    fontSize: 20,
    width: '40%',
    marginHorizontal: '3%',
    textAlign: 'center',
  },
  year_and_month: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 15,
    color: 'white',
    padding: '2.5%',
    marginHorizontal: '3%',
    textAlign: 'center',
    marginTop: '2%',
    marginBottom: '5%',
  },
  week: {
    borderColor: 'white',
    borderWidth: 1,
    width: '80%',
    textAlign: 'center',
    marginHorizontal: '3%',
    marginTop: '2%',
    marginBottom: '5%',
  },
});

const myPageStyles = StyleSheet.create({
  text: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    color: '#FFFFFF',
    marginTop: 30,
    marginBottom: 10,
    fontSize: 20,
    borderColor: '#AAFF',
    borderRadius: 10,
    borderWidth: 2,
    width: '60%',
  },
  text_loading: {
    position: 'absolute',
    bottom: '40%',
    color: '#FFFFFF',
    fontSize: 25,
  },
  logout_button: {
    marginTop: '5%',
    marginBottom: '10%',
    borderColor: '#00FFFF',
    width: '30%',
    paddingVertical: '1%',
    borderWidth: 2,
    borderRadius: 10,
  },
  admin_button: {
    position: 'absolute',
    top: '30%',
    justifyContent: 'center',
    marginTop: '10%',
    borderColor: '#FFF000',
    width: '60%',
    paddingVertical: '1%',
    borderWidth: 2,
    borderRadius: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: '8%',
    color: 'black',
    padding: '3%',
    fontSize: 15,
    width: '100%',
  },
});

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
    maxHeight: '50%',
  },
  voteResultModal: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
    height: '100%',
    maxHeight: '75%',
    marginBottom: '20%',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 12,
    color: 'black',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 20,
    paddingTop: 8,
    marginHorizontal: 5,
  },
  submitButtonText: {
    color: 'rgba(255,15,125,0.9)',
    paddingTop: 8,
    fontSize: 20,
    marginHorizontal: 5,
  },
  label: {
    color: 'black',
    fontSize: 15,
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 3,
  },
});

module.exports = {
  styles,
  modalStyles,
  loginPageStyles,
  signUpPageStyles,
  forgotPasswordPageStyles,
  homePageStyles,
  resultPageStyles,
  myPageStyles,
};
