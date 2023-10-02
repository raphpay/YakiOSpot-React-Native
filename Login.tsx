import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function Login(): JSX.Element {

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function login() {}

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder='Email'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
      />
      <TouchableOpacity onPress={login} style={styles.loginButton}> 
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
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
  loginButtonText: {
    color: "white",
  }
});

export default Login;
