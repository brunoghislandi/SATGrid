import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem vindo de volta, Aluno!</Text>
      <Text style={styles.inputText}>Digite seu e-mail abaixo:</Text>
      <TextInput
        mode="outlined"
        placeholder="example@example.com"
        activeOutlineColor="navy"
        style={styles.input}
      />
      <Text style={styles.inputText}>Digite sua senha abaixo:</Text>
      <TextInput
        mode="outlined"
        placeholder="••••••••••••••••••"
        activeOutlineColor="navy"
        secureTextEntry={true}
        style={styles.input}
      />
      <Button style={styles.button} mode="contained" color="navy"
        onPress={() => navigation.navigate('Login')}
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
  }
});