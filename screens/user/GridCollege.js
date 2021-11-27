import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import openDB from "../../db";

import { useUsuario } from "../../context/UsuarioContext";

const db = openDB();

export default function GridCollege() {
  // agora que temos o UsuarioContext podemos
  // recuperar o usuário logado deste local
  // e não precisar mais nos preocupar com recebe-lo
  // de um parametro vindo da navegação
  const { usuario } = useUsuario();
  const [semestres, setSemestres] = useState("");
  const [showIt, setShowIt] = useState(false);

  const returnText = "pro player de react";

  function recoverData() {
    
    setShowIt(true);
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM semestres WHERE id = 1", (_,) => {
        console.log("rs.rows")
      });
    });
  }

  return (
    <View style={styles.basic}>
      <Text>ID do Usuario: {usuario.id}</Text>
      <Text>Nome do Usuário: {usuario.name}</Text>
      <Button style={styles.button} mode="contained" color="green" onPress={() => recoverData()}>
        aperta ai
      </Button>
      {!!showIt ? <Text style={{ marginTop: 10, fontSize: 16 }}>{semestres}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: "50%",
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
  },
  basic: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
