import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen({ navigation }) {
  const [startEng, setStartEng] = useState("Eng. Computação");
  const [startSex, setStartSex] = useState("Masculino");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Opa, vamo nessa?</Text>
      <Text style={styles.inputText}>Nome</Text>
      <TextInput
        mode="outlined"
        placeholder="Arnold Schwarzenegger"
        activeOutlineColor="navy"
        style={styles.input}
      />
      <Text style={styles.inputText}>E-mail</Text>
      <TextInput
        mode="outlined"
        placeholder="example@example.com"
        activeOutlineColor="navy"
        style={styles.input}
      />
      <Text style={styles.inputText}>Qual sua Engenharia?</Text>
      <Picker
        selectedValue={startEng}
        style={{ height: 50, width: 150 }}
        onValueChange={(pickedEng) => setStartEng(pickedEng)}
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
        selectedValue={startSex}
        style={{ height: 50, width: 150 }}
        onValueChange={(pickedSex) => setStartSex(pickedSex)}
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
        style={styles.input}
      />
      <Button style={styles.button} mode="contained" color="navy"
        onPress={() => navigation.navigate('Register')}
      >CADASTRAR</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 45,
    fontSize: 16,
    margin: 5,
    marginBottom: 10,
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