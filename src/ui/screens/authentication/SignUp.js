import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import AuthService from '../../../business-logic/authService';

import BackgroundImage from '../../components/BackgroundImage';

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

  const form = () => {
    return (
      <KeyboardAvoidingView style={styles.container}>
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
        <TouchableOpacity onPress={signUp}
        style={isFormValid ? styles.loginButton : styles.loginButtonDisabled}
        disabled={!isFormValid}> 
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  return (
    <BackgroundImage
      image={require('../../assets/images/background/signUpBackground.png')}
      content={form()}
      showBackButton={true}
      navigation={navigation}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
  },
  input: {
    height: 44,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  loginButton: {
    height: 44,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonDisabled: {
    height: 44,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
  }
});

export default SignUp;
