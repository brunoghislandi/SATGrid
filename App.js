import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DataTable, Button, Text } from 'react-native-paper';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.basic}>
      <DataTable>
          <DataTable.Header>
            <DataTable.Title>Matéria</DataTable.Title>
            <DataTable.Title numeric>Semestre</DataTable.Title>
            <DataTable.Title numeric>Pré-Requisito</DataTable.Title>
          </DataTable.Header>
      </DataTable>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Soluções Mobile</DataTable.Title>
          <DataTable.Title numeric>6º</DataTable.Title>
          <DataTable.Title numeric>Soluções WEB</DataTable.Title>
        </DataTable.Header>
      </DataTable>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Metodologia Projetual</DataTable.Title>
          <DataTable.Title numeric>6º</DataTable.Title>
          <DataTable.Title numeric>Criatividade e Inovação</DataTable.Title>
        </DataTable.Header>
      </DataTable>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Data Science</DataTable.Title>
          <DataTable.Title numeric>6º</DataTable.Title>
          <DataTable.Title numeric>Data Mining</DataTable.Title>
        </DataTable.Header>
      </DataTable>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>IoT II</DataTable.Title>
          <DataTable.Title numeric>6º</DataTable.Title>
          <DataTable.Title numeric>Sistemas Embarcados</DataTable.Title>
        </DataTable.Header>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Comunicação de Dados</DataTable.Title>
            <DataTable.Title numeric>6º</DataTable.Title>
            <DataTable.Title numeric>Redes de Computadores</DataTable.Title>
          </DataTable.Header>
        </DataTable>
      </DataTable>
    </View>
  );
}

function SemesterScreen({ navigation }) {
  return (
    <View style={styles.basic}>
      <Text>tava testando aqui</Text>
      <Button style={styles.button} mode="contained" color="red"
        onPress={() => console.log('opa')}
      >aperta ai
      </Button>
    </View>
  );
}

function StatusScreen({ navigation }) {
  return (
    <View style={styles.basic}>
      <Text>hm</Text>
      <Button style={styles.button} mode="contained" color="orange"
        onPress={() => console.log('sim')}
      >esse também
      </Button>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Eng. da Computação" component={HomeScreen} />
        <Drawer.Screen name="Semestre" component={SemesterScreen} />
        <Drawer.Screen name="Status" component={StatusScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '50%',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  basic: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});