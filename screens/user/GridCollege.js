import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, FlatList } from "react-native-paper";


import { useUsuario } from "../../context/UsuarioContext";

export default function GridCollege() {
  // agora que temos o UsuarioContext podemos
  // recuperar o usuário logado deste local
  // e não precisar mais nos preocupar com recebe-lo
  // de um parametro vindo da navegação
  const { usuario } = useUsuario();
  const [showIt, setShowIt] = useState(false);



  const EMPTY_SEMESTER = {
    usuario_id: "",
    name: "",
    materia1: "",
    materia2: "",
    materia3: "",
    materia4: "",
    materia5: "",
    finalizarsemestre: "",
    semestresatual: "",
  };

  const [semester, setSemester] = useState({ ...EMPTY_SEMESTER });


  const returnText = "pro player de react";


  function recoverData() {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM semestres WHERE usuario_id = ?", [usuario.id], (_, rs) => {
        setSemester(rs.rows._array);
      });
    });
  }

  console.log('dsad')
  console.log(semester);


  return (

    <>
      {/* <FlatList
        renderItem={({ semester }) => (
          <View style={styles.container}>
            <Text>{semester.name}</Text>
            <Text>{semester.materia1}</Text>
            <Text>{semester.materia2}</Text>
            <Text>{semester.materia3}</Text>
            <Text>{semester.materia4}</Text>
            <Text>{semester.materia5}</Text>
            <Text>{semester.finalizarsemestre}</Text>
          </View>
        )}
      >

      </FlatList> */}

      {/* <View style={styles.basic}>
        <Text>ID do Usuario: {usuario.id}</Text>
        <Text>Nome do Usuário: {usuario.name}</Text>
        <Button style={styles.button} mode="contained" color="green" onPress={() => setShowIt(!showIt)}>
          aperta ai
        </Button>
        {!!showIt ? <Text style={{ marginTop: 10, fontSize: 16 }}>{returnText}</Text> : null}
      </View> */}
    </>

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
