import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Button, ImageBackground } from 'react-native';
import { styles, forgotPasswordPageStyles } from './styles';
import { changePassword } from './api/ChangePassword';

function PasswordComponent({ navigation }) {
    const { email } = navigation.state.params || {};
    const [password, setPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');

    const handleChangePassword = async () => {
        // validation
        if (password.length < 4 || password.length > 12) {
            Alert.alert('비밀번호는 4-12글자여야 합니다')
            return
        }
        // api 요청
        const apiResult = await changePassword(email, password);
        if (apiResult.code == 1000) {
            Alert.alert('Successfully Change Password!');
            navigation.navigate('Login')
        }
        else if (apiResult.code == 1003) {
            Alert.alert("The length of the password should be 4-12 characters.");
            return;
        }
        else {
            Alert.alert('Failed to change password. Retry later.');
            return;
        }
    };

    React.useEffect(() => {
        if (!email) {
            Alert.alert('Please retry reset password process from the beginning.');
            navigation.navigate('Login');
        }
    }, []);

    return (
        <ImageBackground source={require('../assets/backgrounds.jpg')} style={styles.container} >
            <Text style={styles.title1}>Sports Hall</Text>
            <Text style={forgotPasswordPageStyles.label}>New Password</Text>
            <TextInput
                style={forgotPasswordPageStyles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <Text style={forgotPasswordPageStyles.label}>New Password Verification</Text>
            <TextInput
                style={forgotPasswordPageStyles.input}
                value={passwordVerification}
                onChangeText={(text) => setPasswordVerification(text)}
                secureTextEntry={true}
            />
            <View style={forgotPasswordPageStyles.button}>
                <Button title="Change Password" onPress={handleChangePassword} color='#FFFFFF' />
            </View>
        </ImageBackground>
    );
}

export default PasswordComponent;