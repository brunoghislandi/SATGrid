import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import openDB from "../../db";

const db = openDB();

const EMPTY_USR = {
  name: "",
  email: "",
  password: "",
  eng: "Eng. Computação",
  sex: "Masculino"
};

export default function RegisterScreen({ navigation }) {

  const [usuario, setUsuario] = useState({ ...EMPTY_USR });
  const [returnText, setReturnText] = useState('');
  const [showIt, setShowIt] = useState(false);

  function register() {
    if (!usuario.name.trim() || !usuario.email.trim() || !usuario.password.trim()) {
      setShowIt(true)
      setReturnText("Certeza que preencheu tudo? (ง︡'-'︠)ง")
    } else {
      saveUser(usuario, (userID) => {
        setUsuario({ ...EMPTY_USR });
        navigation.navigate('Inside', { screen: 'ShowUser', params: { userID } });
      });
    }
  }

  function saveUser(usuario, onSuccessSaved) {
    db.transaction(tx => {
      tx.executeSql("INSERT INTO usuarios (name, email, eng, sex, password) VALUES(?, ?, ?, ?, ?)", [usuario.name, usuario.email, usuario.eng, usuario.sex, usuario.password], (_, rs) => {
        console.log(`Usuário salvo com o ID: ${rs.insertId}`);
        onSuccessSaved(rs.insertId);
      });
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
        <Text style={styles.text}>Opa, vamo nessa?</Text>
        <Text style={styles.inputText}>Nome</Text>
        <TextInput
          mode="outlined"
          placeholder="Arnold Schwarzenegger"
          activeOutlineColor="navy"
          value={usuario.name}
          onChangeText={name => setUsuario({ ...usuario, name })}
          style={styles.input}
        />
        <Text style={styles.inputText}>E-mail</Text>
        <TextInput
          mode="outlined"
          placeholder="example@example.com"
          activeOutlineColor="navy"
          keyboardType="email-address"
          value={usuario.email.trim()}
          onChangeText={email => setUsuario({ ...usuario, email })}
          style={styles.input}
        />
        <Text style={styles.inputText}>Qual sua Engenharia?</Text>
        <Picker
          style={{ height: 50, width: 150 }}
          selectedValue={usuario.eng}
          onValueChange={eng => setUsuario({ ...usuario, eng })}
          style={styles.input}
        >
          <Picker.Item label="Eng. Computação" value="Eng. Computação" />
          <Picker.Item label="Eng. Mecânica" value="Eng. Mecânica" />
          <Picker.Item label="Eng. Elétrica" value="Eng. Elétrica" />
          <Picker.Item label="Eng. Mecatrônica" value="Eng. Mecatrônica" />
          <Picker.Item label="Eng. Minas" value="Eng. Minas" />
        </Picker>
        <Text style={styles.inputText}>Sexo</Text>
        <Picker
          style={{ height: 50, width: 150 }}
          selectedValue={usuario.sex}
          onValueChange={sex => setUsuario({ ...usuario, sex })}
          style={styles.input}
        >
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
        <Text style={styles.inputText}>Senha</Text>
        <TextInput
          mode="outlined"
          placeholder="••••••••••••••••••"
          activeOutlineColor="navy"
          secureTextEntry={true}
          value={usuario.password.trim()}
          onChangeText={password => setUsuario({ ...usuario, password })}
          style={styles.input}
        />
        {!!showIt ? <Text style={styles.alertText}>{returnText}</Text> : null}
        <Button style={styles.button} mode="contained" color="navy"
          onPress={() => register()}
        >CADASTRAR</Button>
        <Text style={styles.infoText}> Já tem conta com a gente? ツ </Text>
        <Button style={styles.button} mode="contained" color="gray"
          onPress={() => navigation.navigate('Login')}
        >ACESSE!</Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 45,
    fontSize: 16,
    margin: 5,
    lineHeight: 45,
    marginBottom: 10
  },
  text: {
    marginTop: 30,
    marginBottom: 50,
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
    width: '80%',
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