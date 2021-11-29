import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, StatusBar, SafeAreaView, RefreshControl } from "react-native";

import openDB from "../../db";

import { useUsuario } from "../../context/UsuarioContext";

const db = openDB();

export default function GridCollege({navigation}) {
  const { usuario } = useUsuario();
  const [refreshing, setRefreshing] = useState(true);

  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState([]);

  const loadData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM semestres WHERE usuario_id = ?",
        [usuario.id],
        (tx, results) => {
          setRefreshing(false);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
          if (results.rows.length >= 1) {
            setEmpty(false);
          } else {
            setEmpty(true)
          }
        }
      );
    });
  }

  useEffect(() => {
    loadData()
  }, []);

  navigation.addListener("focus", () => {
    loadData()
  });

  const emptyMSG = (status) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={styles.epmtyAlert}>
          Opa! Parece que você ainda não cadastrou nenhum semestre ainda!
        </Text>
      </View>
    );
  }

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {empty ? emptyMSG(empty) :
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={loadData} />
            }
            renderItem={({ item }) =>
              <View key={item.student_id} style={styles.container}>
                <Text style={styles.semesterName}>{item.name}</Text>
                <Text style={styles.BaseStyle}> Segunda: <Text style={styles.itemStyle}>{item.materia1}</Text> </Text>
                <Text style={styles.BaseStyle}> Terça: <Text style={styles.itemStyle}>{item.materia2} </Text></Text>
                <Text style={styles.BaseStyle}> Quarta: <Text style={styles.itemStyle}>{item.materia3} </Text></Text>
                <Text style={styles.BaseStyle}> Quinta: <Text style={styles.itemStyle}>{item.materia4} </Text></Text>
                <Text style={styles.BaseStyle}> Sexta: <Text style={styles.itemStyle}>{item.materia5} </Text></Text>
                <Text style={styles.BaseStyle}> Semestre atual: <Text style={styles.itemStyle}>{item.semestresatual > 0 ? "Sim" : "Não"} </Text></Text>
              </View>
            }
          />
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 2,
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
  semesterName: {
    color: "navy",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    margin: 10
  },
  BaseStyle: {
    color: "green",
    padding: 2,
    fontWeight: "700"
  },
  itemStyle: {
    color: "gray",
  },
  epmtyAlert: {
    color: "navy",
    fontWeight: "700",
    fontSize: 17,
    textAlign: "center",
    backgroundColor: "#FFF",
    borderRadius: 7,
    padding: 20,
    margin: 20
  }
});