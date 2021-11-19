import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';

import openDB from "../../db";

const db = openDB();

function UsuarioItem({ usuario, onRemoveUsuario }) {
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
        <Button style={styles.button} mode="contained" color="navy"
        onPress={() => {
            Alert.alert(
              "Exclusão de usuário",
              `Você confirma a exclusão do usuário ${usuario.name}?`,
              [
                {
                  text: "Cancelar",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => onRemoveUsuario(usuario.id) },
              ],
              { cancelable: false }
            );
          }}
        >DELETAR</Button>
            </View>
        </View>
    );
}

export default function SQLiteScreen() {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    function recuperaUsuarios() {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM usuarios ORDER BY name ASC", [], (_, rs) => {
                setUsuarios(rs.rows._array);
                setLoading(false);
            });
        });
    }

    function removeUsuario(id) {
        db.transaction(tx => {
          tx.executeSql("DELETE FROM usuarios WHERE id = ?", [id], (_, rs) => {
            recuperaUsuarios();
          });
        });
      }

    useEffect(() => {
        recuperaUsuarios();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1, marginLeft: -14, marginRight: -14, marginBottom: -14 }}>
                {!loading ? (
                    <View>
                        {usuarios.map(usuario => (
                            <UsuarioItem key={usuario.id} usuario={usuario} onRemoveUsuario={removeUsuario}/>
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
    },
    button: {
        marginTop: 20,
        width: '95%',
        height: 35,
        alignSelf: "center",
        justifyContent: "center",
      }
  });
