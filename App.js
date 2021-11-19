import React from "react";
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, Text } from 'react-native-paper';

import 'react-native-gesture-handler';
import LoginScreen from "./screens/access/LoginScreen";
import RegisterScreen from "./screens/access/RegisterScreen";
import logo from './assets/logo.png';

import EditProfile from "./screens/src/EditProfile";
import EditSemester from "./screens/src/EditSemester";
import GridCollege from "./screens/src/GridCollege";
import ShowUser from "./screens/src/HomeScreen";

function InitialScreen ({ navigation }) {
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
        <Drawer.Screen name="ShowUser" component={ShowUser} options={{ title: "Bem-vindo!" }} />
        <Drawer.Screen name="Grade Completa" component={GridCollege} options={{ title: "Suas matérias" }} />
        <Drawer.Screen name="Editar Semestre" component={EditSemester} options={{ title: "Edição de Semestre" }} />
        <Drawer.Screen name="Editar Perfil" component={EditProfile} options={{ title: "Edição de Perfil" }} />
      </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

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
        <Stack.Screen name="Home" component={InitialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "ACESSO" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "CADASTRO" }} />
        <Stack.Screen name="Inside" component={InsideApp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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