import React from "react";
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, Text } from 'react-native-paper';

import 'react-native-gesture-handler';
import loginScreen from "./screens/access/loginScreen";
import registerScreen from "./screens/access/registerScreen";
import logo from './assets/logo.png';

import editProfile from "./screens/src/editProfile";
import editSemester from "./screens/src/editSemester";
import gridCollege from "./screens/src/gridCollege";
import homeScreen from "./screens/src/homeScreen";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 390, height: 160, resizeMode: 'contain' }} />
      <Text style={styles.text}>Planejamento de Grade Curricular</Text>
      <Button style={styles.button} mode="contained" color="green"
        onPress={() => navigation.navigate('Login')}
      >ACESSAR</Button>
      <Button style={styles.button} mode="contained" color="navy"
        onPress={() => navigation.navigate('Register')}
      >REGISTRE-SE!</Button>
      <StatusBar barStyle="light-content" backgroundColor="navy" translucent={true} />
    </View>
  );
}

function InsideApp() {
  return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "navy",
          },
          headerTintColor: "#fff"
        }}
      >
        <Drawer.Screen name="Tela Inicial" component={homeScreen} options={{ title: "Bem-vindo!" }} />
        <Drawer.Screen name="Grade Completa" component={gridCollege} options={{ title: "Suas matérias" }} />
        <Drawer.Screen name="Editar Semestre" component={editSemester} options={{ title: "Edição de Semestre" }} />
        <Drawer.Screen name="Editar Perfil" component={editProfile} options={{ title: "Edição de Perfil" }} />
      </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "navy",
          },
          headerTintColor: "#fff"
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={loginScreen} options={{ title: "ACESSO" }} />
        <Stack.Screen name="Register" component={registerScreen} options={{ title: "CADASTRO" }} />
        <Stack.Screen name="Inside" component={InsideApp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 10,
    width: "80%",
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: 'sans-serif-light',
    color: 'navy',
    marginBottom: 250
  }
});