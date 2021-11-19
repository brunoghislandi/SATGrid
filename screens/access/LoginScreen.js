import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [returnText, setReturnText] = useState('');
  const [showIt, setShowIt] = useState(false);

  function login() {

    if (!email.trim() || !password.trim()) {
      setShowIt(true)
      setReturnText("E-mail ou senha inválidos 😳")
    } else {
      // navigation.navigate('Inside')
    }
  }

  navigation.addListener('focus', () => {
    setShowIt(false);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem vindo de volta, Aluno!</Text>
      <Text style={styles.inputText}>Digite seu e-mail abaixo:</Text>
      <TextInput
        mode="outlined"
        placeholder="example@example.com"
        activeOutlineColor="navy"
        keyboardType="email-address"
        value={email}
        onChangeText={email => setEmail(email.trim())}
        style={styles.input}
      />
      <Text style={styles.inputText}>Digite sua senha abaixo:</Text>
      <TextInput
        mode="outlined"
        placeholder="••••••••••••••••••"
        activeOutlineColor="navy"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password.trim())}
        style={styles.input}
      />
      {!!showIt ? <Text style={styles.alertText}>{returnText}</Text> : null}
      <Button style={styles.button} mode="contained" color="navy"
        onPress={() => login()}
      >ACESSAR</Button>
      <Text style={styles.infoText}> Lembrou que não tem cadastro? ツ </Text>
      <Button style={styles.button} mode="contained" color="gray"
        onPress={() => navigation.navigate('Register')}
      >REGISTRE-SE!</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    fontSize: 18,
    margin: 5,
    lineHeight: 45,
    marginBottom: 10
  },
  text: {
    marginTop: 30,
    marginBottom: 150,
    fontSize: 20,
    fontFamily: 'sans-serif-light',
    color: 'navy',
    alignSelf: 'center'
  },
  inputText: {
    fontSize: 14,
    marginLeft: 5
  },
  button: {
    marginTop: 20,
    width: "80%",
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
  },
  infoText: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'sans-serif-light',
    color: 'black',
    alignSelf: 'center'
  },
  alertText: {
    alignSelf: 'center',
    color: 'crimson',
    fontWeight: 'bold',
    fontSize: 14
  }
});