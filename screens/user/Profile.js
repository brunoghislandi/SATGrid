import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Text } from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

import openDB from "../../db";

import { useUsuario } from "../../context/UsuarioContext";

const db = openDB();

function ReturnData() {
  const navigation = useNavigation(); 
  const { usuario } = useUsuario();

  return (
    <View>
        <Text style={styles.usuarioText}>Bem vindo de volta, {usuario.name} ;)</Text>
        <Text style={styles.defautText}>Caso não se lembrar, suas informações são:</Text>
        <Text style={[styles.defautText, styles.defautText, { marginTop: 5, color: "red" }]}>E-mail:</Text>
        <Text style={styles.defautText}>{usuario.email}</Text>
        <Text style={[styles.defautText, styles.defautText, { marginTop: 5, color: "red" }]}>Engenharia:</Text>
        <Text style={styles.defautText}>{usuario.eng}</Text>
        <Text style={[styles.defautText, styles.defautText, { marginTop: 5, color: "red" }]}>Sexo:</Text>
        <Text style={styles.defautText}>{usuario.sex}</Text>
        <Text style={styles.usuarioText}>Se estiver saindo, até a próxima! ❤</Text>
        <Button style={styles.button} mode="contained" color="crimson" onPress={() => navigation.navigate('Login')}>
        LOGOUT
      </Button>
    </View>
  );
}

export default function ShowUser() {

  const { usuario } = useUsuario();
  const userID = usuario.id;
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  function recoverData() {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM usuarios WHERE id = ?", [userID], (_, rs) => {
        setUsuarios(rs.rows._array);
        setLoading(false);
      });
    });
  }

  useEffect(() => {
    recoverData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, marginLeft: -14, marginRight: -14, marginBottom: -14 }}>
        {!loading ? (
          <View>
            {usuarios.map(usuario => (
              <ReturnData key={usuario.id} usuario={usuario} />
            ))}
          </View>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center", padding: 30 }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 7,
    backgroundColor: "#FFF",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  usuarioText: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 18,
    lineHeight: 21,
    textAlign: "center",
    color: "navy",
    fontWeight: "700"
  },
  defautText: {
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    color: "black"
  },
  button: {
    marginTop: 10,
    width: "90%",
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
  }
});