import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen({ navigation }) {

  const [yourName, setYourName] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [yourPass, setYourPass] = useState('');
  const [yourEng, setYourEng] = useState('');
  const [yourSex, setYourSex] = useState('');
  const [returnText, setReturnText] = useState('');
  const [showIt, setShowIt] = useState(false);

  function register() {

    if (!yourName.trim() || !yourEmail.trim() || !yourPass.trim()) {
      setShowIt(true)
      setReturnText("Certeza que preencheu tudo? (ง︡'-'︠)ง")
    } else {
      navigation.navigate('Inside')
    }
  }

  navigation.addListener('focus', () => {
    setShowIt(false);
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
        <Text style={styles.text}>Opa, vamo nessa?</Text>
        <Text style={styles.inputText}>Nome</Text>
        <TextInput
          mode="outlined"
          placeholder="Arnold Schwarzenegger"
          activeOutlineColor="navy"
          value={yourName}
          onChangeText={yourName => setYourName(yourName)}
          style={styles.input}
        />
        <Text style={styles.inputText}>E-mail</Text>
        <TextInput
          mode="outlined"
          placeholder="example@example.com"
          activeOutlineColor="navy"
          keyboardType="email-address"
          value={yourEmail}
          onChangeText={yourEmail => setYourEmail(yourEmail.trim())}
          style={styles.input}
        />
        <Text style={styles.inputText}>Qual sua Engenharia?</Text>
        <Picker
          selectedValue={yourEng}
          style={{ height: 50, width: 150 }}
          onValueChange={(pickedEng) => setYourEng(pickedEng)}
          style={styles.input}
        >
          <Picker.Item label="Eng. Computação" value="comp" />
          <Picker.Item label="Eng. Mecânica" value="mec" />
          <Picker.Item label="Eng. Elétrica" value="eletro" />
          <Picker.Item label="Eng. Mecatrônica" value="meca" />
          <Picker.Item label="Eng. Minas" value="minas" />
        </Picker>
        <Text style={styles.inputText}>Sexo</Text>
        <Picker
          selectedValue={yourSex}
          style={{ height: 50, width: 150 }}
          onValueChange={(pickedSex) => setYourSex(pickedSex)}
          style={styles.input}
        >
          <Picker.Item label="Masculino" value="masc" />
          <Picker.Item label="Feminino" value="fem" />
          <Picker.Item label="Outro" value="outro" />
        </Picker>
        <Text style={styles.inputText}>Senha</Text>
        <TextInput
          mode="outlined"
          placeholder="••••••••••••••••••"
          activeOutlineColor="navy"
          secureTextEntry={true}
          value={yourPass}
          onChangeText={yourPass => setYourPass(yourPass.trim())}
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