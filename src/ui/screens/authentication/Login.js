import React, {useState} from 'react';
import {
  Alert,
  Image,
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

  const form = () => {
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
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.backgroundContainer}>
      <Image 
        source={require('../../assets/images/background/login-background.png')}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo/Horizontal-Logo.png')}
          resizeMode={'cover'}
          style={styles.logo}
        />
      </View>
      {form()}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
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
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    opacity: 0.45,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    height: 54,
    width: 200,
  },
  signUpButtonText: {
    fontWeight: "bold",
  }
});

export default Login;
