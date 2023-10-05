import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  View,
} from 'react-native';

import AuthService from '../../../business-logic/authService';

import BackgroundImage from '../../components/BackgroundImage';
import TopBarNav from '../../components/TopBarNav';
import ImageButton from '../../components/ImageButton';

function SignUp(props) {

  const { navigation } = props;

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passwordConfirmation, onChangePasswordConfirmation] = useState("");
  
  const isFormValid =
    email !== "" &&
    password !== "" &&
    password.length >= 6 &&
    passwordConfirmation !== "" &&
    password === passwordConfirmation;

  function signUp() {
    if (isFormValid) {
      AuthService.shared().signUp(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(errorMessage => {
        Alert.alert('Error during registration', errorMessage, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
    }
  }

  const leftTopBarComponent = () => {
    return (
      <ImageButton
        source={require('../../assets/icons/arrow.left.circle.png')}
        onPress={() => navigation.goBack()}
      />
    )
  }

  const form = () => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <TopBarNav
                leftComponent={leftTopBarComponent()}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeEmail}
                  value={email}
                  placeholder='Email'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                />
                <TextInput
                  style={styles.input}
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder="Password"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={onChangePasswordConfirmation}
                  value={passwordConfirmation}
                  placeholder="Password Confirmation"
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={signUp}
                  style={{backgroundColor: isFormValid ? Colors.brownish : "gray", ...styles.signUpButton}}
                  disabled={!isFormValid}> 
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  return (
    <BackgroundImage
      image={require('../../assets/images/background/signUpBackground.png')}
      content={form()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignContent: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  input: {
    height: 44,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  signUpButton: {
    height: 44,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "white",
  }
});

export default SignUp;
