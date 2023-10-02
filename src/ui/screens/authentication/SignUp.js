import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';

function SignUp() {

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passwordConfirmation, onChangePasswordConfirmation] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  
  const isFormValid =
    email !== "" &&
    password !== "" &&
    password.length >= 6 &&
    passwordConfirmation !== "" &&
    password === passwordConfirmation;

  function signUp() {
    if (isFormValid) {
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setAlertMessage('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          setAlertMessage('That email address is invalid!');
        }

        if (error.code === 'auth/weak-password') {
          setAlertMessage('Password should be at least 6 characters');
        }

        Alert.alert('Error during registration', alertMessage, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

      });
    }
  }

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
