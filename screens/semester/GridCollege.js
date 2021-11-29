import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, StatusBar, SafeAreaView, RefreshControl } from "react-native";

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
  const [refreshing, setRefreshing] = useState(true);

  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState([]);

  const loadData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM semestres WHERE usuario_id = ?',
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
 
  const emptyMSG = (status) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 13, textAlign: 'center' }}>
          Nenhum semestre cadastrado!
          </Text>
 
      </View>
    );
  }

  return (

    <SafeAreaView >
      <View >
        {empty ? emptyMSG(empty) :
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={loadData} />
            // }
            renderItem={({ item }) =>
              <View key={item.student_id} style={styles.container}>
 
                <Text style={styles.semesterName}>{item.name}</Text>
                <Text style={styles.itemsStyle}> Segunda: <Text style={styles.itemStyle}>{item.materia1}</Text> </Text>
                <Text style={styles.itemsStyle}> Terça: <Text style={styles.itemStyle}>{item.materia2} </Text></Text>
                <Text style={styles.itemsStyle}> Quarta: <Text style={styles.itemStyle}>{item.materia3} </Text></Text>
                <Text style={styles.itemsStyle}> Quinta: <Text style={styles.itemStyle}>{item.materia4} </Text></Text>
                <Text style={styles.itemsStyle}> Sexta: <Text style={styles.itemStyle}>{item.materia5} </Text></Text>
                <Text style={styles.itemsStyle}> Semestre atual: <Text style={styles.itemStyle}>{item.semestresatual > 0 ? "Sim" : "Não"} </Text></Text>
                {/* <Text style={styles.itemsStyle}> Semestre finalizado: {item.finalizarsemestre} </Text> */}
 
              </View>
            }
          />
        }
      </View>
    </SafeAreaView>
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
    elevation: 3,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
 
  touchableOpacity: {
    backgroundColor: '#0091EA',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
 
  touchableOpacityText: {
    color: '#FFFFFF',
    fontSize: 23,
    textAlign: 'center',
    padding: 8
  },
 
  textInputStyle: {
    height: 45,
    width: '90%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#00B8D4',
    borderRadius: 7,
    marginTop: 15,
  },
  semesterName: {
    color: "navy",
    fontSize: 18,
    textAlign: 'center',
    fontWeight: "bold",
    margin: 10
  },
  itemsStyle: {
    color: 'green',
    padding: 2,
    fontWeight: '700',
  },
  itemStyle: {
    color: 'gray',
    fontWeight: '200',
  },
});
