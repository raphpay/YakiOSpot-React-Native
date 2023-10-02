import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function Login(props) {

  const { navigation } = props;

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function login() {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User signed in!');
    })
    .catch(error => {

      switch (error.code) {
        case 'auth/invalid-email':
          setAlertMessage('The email address is invalid!');
          break;
        case 'auth/user-disabled':
          setAlertMessage('The user is disabled!');
          break;
        case 'auth/user-not-found':
          setAlertMessage('The user was not found!');
          break;
        case 'auth/wrong-password':
          setAlertMessage('The password is incorrect!');
          break;
        case 'auth/too-many-requests':
          setAlertMessage('Too many requests!');
          break;
        default:
          setAlertMessage('An error occurred!');
          break;
      }

      Alert.alert('Error during registration', alertMessage, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    });
  }

  function goToSignUpScreen() {
    navigation.navigate("SignUp");
  }

  const isFormValid = email !== "" && password !== "";

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
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
        style={isFormValid ? styles.loginButton : styles.loginButtonDisabled}
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
