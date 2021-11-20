import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Text } from 'react-native';

import openDB from "../../db";

const db = openDB();

function ReturnData({ usuario }) {
  return (
    <View style={styles.usuarioItem}>
      <View style={styles.usuarioItemDados}>
        <Text style={[styles.usuarioText, styles.usuarioTextLabel]}>Nome:</Text>
        <Text style={styles.usuarioText}>{usuario.name}</Text>
        <Text style={[styles.usuarioText, styles.usuarioTextLabel, { marginTop: 5 }]}>E-mail:</Text>
        <Text style={styles.usuarioText}>{usuario.email}</Text>
        <Text style={[styles.usuarioText, styles.usuarioTextLabel, { marginTop: 5 }]}>Engenharia:</Text>
        <Text style={styles.usuarioText}>{usuario.eng}</Text>
        <Text style={[styles.usuarioText, styles.usuarioTextLabel, { marginTop: 5 }]}>Sexo:</Text>
        <Text style={styles.usuarioText}>{usuario.sex}</Text>
        <Text style={[styles.usuarioText, styles.usuarioTextLabel, { marginTop: 5 }]}>Senha:</Text>
        <Text style={styles.usuarioText}>{usuario.password}</Text>
      </View>
    </View>
  );
}

export default function ShowUser({ route }) {

  const { userID } = route.params;
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
    padding: 14,
  },
  form: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 12,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#909090",
    padding: 6,
    marginBottom: 9,
  },
  usuarioItem: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede",
  },
  usuarioItemDados: {
    flex: 1,
  },
  usuarioText: {
    fontSize: 15,
    lineHeight: 21,
  },
  usuarioTextLabel: {
    fontWeight: "bold",
  }
});