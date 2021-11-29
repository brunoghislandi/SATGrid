import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import openDB from "../../db";

import { useAuth } from "../../context/AuthContext";

const db = openDB();

const EMPTY_USR = {
  name: "",
  email: "",
  password: "",
  eng: "Eng. Computação",
  sex: "Masculino",
};

export default function RegisterScreen({ navigation }) {
  // resgatando do AuthContext a função que "recebe"
  // o usuário logado para depois "divulgar" a toda
  // a aplicação
  const { login } = useAuth();

  const [usuario, setUsuario] = useState({ ...EMPTY_USR });
  const [returnText, setReturnText] = useState("");
  const [showIt, setShowIt] = useState(false);

  function register() {
    if (!usuario.name.trim() || !usuario.email.trim() || !usuario.password.trim()) {
      setShowIt(true);
      setReturnText("Certeza que preencheu tudo? (ง︡'-'︠)ง");
    } else {
      verify(usuario, notExists => {
        if (!!notExists) {
          saveUser(usuario, userID => {
            // se conseguimos salvar o usuário com sucesso
            // podemos registra-lo no AuthContext para uso futuro
            // em outras telas
            login({ ...usuario, id: userID });

            // depois disso podemos limpar o usuário do formulário
            setUsuario({ ...EMPTY_USR });

            // e navegar para próxima tela...
            navigation.navigate("Inside");
          });
        } else {
          setShowIt(true);
          setReturnText("E-mail já cadastrado");
        }
      });
    }
  }

  function verify(usuario, onNotFound) {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM usuarios WHERE email = ?", [usuario.email], (_, rs) => {
        if (rs.rows.length === 0) {
          onNotFound(true);
        } else {
          onNotFound(false);
        }
      });
    });
  }

  function saveUser(usuario, onSuccessSaved) {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO usuarios (name, email, eng, sex, password) VALUES(?, ?, ?, ?, ?)",
        [usuario.name, usuario.email, usuario.eng, usuario.sex, usuario.password],
        (_, rs) => {
          console.log(`Usuário salvo com o ID: ${rs.insertId}`);
          onSuccessSaved(rs.insertId);
        }
      );
    });
  }

  navigation.addListener("focus", () => {
    setShowIt(false);
  });

  return (
    <View style={styles.container}>
      {/* <ScrollView contentContainerStyle={{ paddingBottom: 25 }}> */}
        <Text style={styles.text}>Opa, vamos nessa?</Text>
        <TextInput
          mode="outlined"
          label="Nome"
          placeholder="Arnold Schwarzenegger"
          activeOutlineColor="navy"
          value={usuario.name}
          onChangeText={name => setUsuario({ ...usuario, name })}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="E-mail"
          placeholder="example@example.com"
          autoCapitalize="none"
          activeOutlineColor="navy"
          keyboardType="email-address"
          value={usuario.email.trim()}
          onChangeText={email => setUsuario({ ...usuario, email })}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Senha"
          placeholder="••••••••••••••••••"
          activeOutlineColor="navy"
          secureTextEntry={true}
          value={usuario.password.trim()}
          onChangeText={password => setUsuario({ ...usuario, password })}
          style={styles.input}
        />
        <Text style={styles.inputText}>Selecione sua engenharia</Text>
        <Picker
          style={{ height: 50}}
          selectedValue={usuario.eng}
          onValueChange={eng => setUsuario({ ...usuario, eng })}
          style={styles.inputDropdown}>
          <Picker.Item style={styles.pickeritem} label="Eng. Computação" value="Eng. Computação" />
          <Picker.Item style={styles.pickeritem} label="Eng. Mecânica" value="Eng. Mecânica" />
          <Picker.Item style={styles.pickeritem} label="Eng. Elétrica" value="Eng. Elétrica" />
          <Picker.Item style={styles.pickeritem} label="Eng. Mecatrônica" value="Eng. Mecatrônica" />
          <Picker.Item style={styles.pickeritem} label="Eng. Minas" value="Eng. Minas" />
        </Picker>
        <Text style={styles.inputText}>Sexo</Text>
        <Picker
          style={{ height: 50 }}
          selectedValue={usuario.sex}
          onValueChange={sex => setUsuario({ ...usuario, sex })}
          style={styles.inputDropdown}>
          <Picker.Item style={styles.pickeritem} label="Masculino" value="Masculino" />
          <Picker.Item style={styles.pickeritem} label="Feminino" value="Feminino" />
          <Picker.Item style={styles.pickeritem} label="Outro" value="Outro" />
        </Picker> 
        {!!showIt ? <Text style={styles.alertText}>{returnText}</Text> : null}
        <Button style={styles.button} mode="contained" color="green" onPress={() => register()}>
          CADASTRAR
        </Button>
        <Text style={styles.infoText}> Já tem uma conta? <Text style={{color: "navy"}} onPress={() => navigation.navigate("Login")}>
        Acesse aqui!
      </Text></Text>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    fontSize: 13,
    lineHeight: 45,
    marginBottom: 10,
  },
  inputDropdown: {
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginTop: 5
  },
  text: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20,
    fontFamily: "sans-serif-light",
    color: "navy",
    fontWeight: '700',
    alignSelf: "center",
  },
  inputText: {
    fontSize: 10,
    textTransform: "uppercase",
    color: 'gray',
    marginTop: 10,
  },
  pickeritem: {
    margin: 20,
    alignItems: 'center'
  },
  button: {
    marginTop: 20,
    width: "100%",
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
  },
  infoText: {
    marginTop: 20,
    fontSize: 13,
    fontFamily: "sans-serif-light",
    color: "gray",
    alignSelf: "center",
  },
  alertText: {
    alignSelf: "center",
    color: "crimson",
    fontWeight: "bold",
    fontSize: 14,
  },
});
