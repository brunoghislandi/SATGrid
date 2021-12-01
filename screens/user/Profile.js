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
    <View style={styles.container}>
        <Text style={styles.usuarioText}>Olá, {usuario.name} ;)</Text>
        <Text style={styles.defaultText}>Caso não se lembre, suas informações são:</Text>
        <View style={styles.container2}>
        <Text style={[styles.defautTextTitle, styles.defautTextTitle,]}>E-mail:</Text>
        <Text style={styles.defautText}>{usuario.email}</Text>
        <Text style={[styles.defautTextTitle, styles.defautTextTitle,]}>Engenharia:</Text>
        <Text style={styles.defautText}>{usuario.eng}</Text>
        <Text style={[styles.defautTextTitle, styles.defautTextTitle,]}>Sexo:</Text>
        <Text style={styles.defautText}>{usuario.sex}</Text>
        </View>
        <Text style={styles.usuarioText}>Se estiver saindo, até a próxima!</Text>
        <Button style={styles.button} mode="contained" color="forestgreen" onPress={() => navigation.navigate('Login')}>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  container2: {
    flex: 1,
    width: '100%',
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 2,
    borderRadius: 7,
    backgroundColor: "#FFF",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: "center"
  },
  usuarioText: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: "center",
    color: "navy",
    alignSelf: "center",
    justifyContent: "center"
  },
  defautText: {
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 10,
    color: "gray"
  },
  defaultText: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: "center",
    color: "gray"

  },
  defautTextTitle: {
    textTransform: "uppercase",
    fontSize: 11,
    color: "forestgreen"
  },
  button: {
    marginTop: 10,
    width: "90%",
    height: 45,
    alignSelf: "center",
    justifyContent: "center"
  }
});