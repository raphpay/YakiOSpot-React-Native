import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AuthService from '../../../business-logic/authService';

import Colors from '../../assets/colors/Colors';

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
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    });
  }

  function goToSignUpScreen() {
    navigation.navigate("SignUp");
  }

  const isFormValid = email !== "" && password !== "";

  return (
    <SafeAreaView style={styles.container}>
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
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  },
  noAccountText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButton: {
    paddingLeft: 5,
  }
});

export default Login;
