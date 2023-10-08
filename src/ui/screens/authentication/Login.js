import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard
} from 'react-native';

import AuthService from '../../../business-logic/authService';

import Colors from '../../assets/colors/Colors';
import BackgroundImage from '../../components/BackgroundImage';
import TopBarNav from '../../components/TopBarNav';

function Login(props) {

  const { navigation } = props;

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  function login() {
    AuthService.shared()
    .login(email, password)
    .then(() => {
      console.log('User signed in!');
    })
    .catch(errorMessage => {
      Alert.alert('Error during registration', errorMessage, [
        {text: 'OK'},
      ]);
    });
  }

  function goToSignUpScreen() {
    navigation.navigate("SignUp");
  }

  const isFormValid = email !== "" && password !== "";

  const form = () => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <TopBarNav />
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
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={login}
                  style={{backgroundColor: isFormValid ? Colors.brownish : "gray", ...styles.loginButton}}
                  disabled={!isFormValid}
                > 
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.noAccountText}>
                  <Text>Don't have an account?</Text>
                  <TouchableOpacity onPress={goToSignUpScreen} style={styles.signUpButton}>
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  return (
    <BackgroundImage
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
  loginButton: {
    height: 44,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  loginButtonText: {
    color: "white",
  },
  noAccountText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButton: {
    paddingLeft: 5,
  },
  signUpButtonText: {
    fontWeight: "bold",
  }
});

export default Login;
