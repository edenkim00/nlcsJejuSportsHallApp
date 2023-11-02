import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  Alert,
} from 'react-native';
import {styles, signUpPageStyles} from './styles';
function SignUpComponent({navigation}) {
  const [name, setName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const goToSignUpPage2 = async () => {
    if (name == '') {
      Alert.alert('Please enter your name.');
      return;
    }
    if (graduationYear == '') {
      Alert.alert('Please enter the graduation year');
      return;
    }
    if (graduationYear.length != 4) {
      Alert.alert('Please enter the correct graduation year (4 digits)');
      return;
    }
    navigation.navigate('SignUpPage2', {
      name: name,
      graduationYear: graduationYear,
    });
  };
  return (
    <ImageBackground
      source={require('../assets/backgrounds.jpg')}
      style={styles.container}>
      <Text style={styles.title1}>Sports Hall</Text>
      <Text style={styles.title2}>VOTING SYSTEM</Text>
      <Text style={styles.title3}>@NLCS JEJU</Text>
      <Text style={signUpPageStyles.label}>Name</Text>
      <TextInput
        style={signUpPageStyles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={signUpPageStyles.label}>Graduation Year</Text>
      <TextInput
        style={signUpPageStyles.input}
        value={graduationYear}
        onChangeText={text => setGraduationYear(text)}
      />
      <View style={signUpPageStyles.button}>
        <Button title="Next" onPress={goToSignUpPage2} color="#FFFFFF" />
      </View>
    </ImageBackground>
  );
}

export default SignUpComponent;
