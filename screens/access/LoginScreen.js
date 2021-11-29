import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

import openDB from "../../db";

import { useAuth } from "../../context/AuthContext";

const EMPTY_USR = {
  email: "",
  password: "",
};

const db = openDB();

export default function LoginScreen({ navigation }) {
  // resgatando do AuthContext a função que "recebe"
  // o usuário logado para depois "divulgar" a toda
  // a aplicação
  const { login } = useAuth();

  const [usuario, setUsuario] = useState({ ...EMPTY_USR });
  const [returnText, setReturnText] = useState("");
  const [showIt, setShowIt] = useState(false);

  function testLogin() {
    if (!usuario.email.trim() || !usuario.password.trim()) {
      setShowIt(true);
      setReturnText("Certeza que preencheu tudo? (ง︡'-'︠)ง");
    } else {
      verify(usuario, userData => {
        if (!userData) {
          setShowIt(true);
          setReturnText("Dados não cadastrados 😳");
        } else {
          // se conseguimos encontrar o usuário com sucesso
          // podemos registra-lo no AuthContext para uso futuro
          // em outras telas
          login(userData);

          // e navegar para próxima tela...
          navigation.navigate("Inside");
        }
      });
    }
  }

  function verify(usuario, onSuccess) {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM usuarios  WHERE email = ? AND password = ?",
        [usuario.email, usuario.password],
        (_, rs) => {
          if (rs.rows.length === 0) {
            onSuccess(null);
          } else {
            console.log(`Usuário ID ${rs.rows._array[0].id} logado.`);
            // melhor passar todos os dados do usuário, não apenas o ID
            onSuccess(rs.rows._array[0]);
          }
        }
      );
    });
  }

  navigation.addListener("focus", () => {
    setShowIt(false);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem vindo de volta, Aluno!</Text>
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
      <Button style={styles.button} mode="contained" color="green" onPress={() => testLogin()}>
        ACESSAR
      </Button>
      <Text style={styles.infoText}>Ainda não tem cadastro? <Text style={{color: "navy"}} onPress={() => navigation.navigate("Register")}>
        Registre-se aqui!
      </Text></Text>
      {!!showIt ? <Text style={styles.alertText}>{returnText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    fontSize: 13,
    lineHeight: 45,
    marginBottom: 10,
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
    fontSize: 13,
  },
  button: {
    marginTop: 10,
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
    marginTop: 20
  },
});
