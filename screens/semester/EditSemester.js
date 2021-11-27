import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput, Switch, ScrollView } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";

import subjects from "./mocks/subjects.json";

import openDB from "../../db";

import { useUsuario } from "../../context/UsuarioContext";

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

const db = openDB();

/* 
function SelectSubjects({ subjectsOfWeek, dayOfWeek }) {
  const [selectedSubject, setSelectedSubject] = useState();

  return (
    <View>
      <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      <Picker selectedValue={selectedSubject} onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}>
        {subjectsOfWeek.map(subject => {
          return <Picker.Item label={subject.name} value={subject.name} />;
        })}
      </Picker>
    </View>
  );
} 
*/

export default function EditSemester() {
  // agora que temos o UsuarioContext podemos
  // recuperar o usuário logado deste local
  // e não precisar mais nos preocupar com recebe-lo
  // de um parametro vindo da navegação
  const { usuario } = useUsuario();
  const [semester, setSemester] = useState({ ...EMPTY_SEMESTER });


  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [returnText, setReturnText] = useState("");


  function register() {

    saveSemester(semester, semesterID => {

      setSemester({ ...EMPTY_SEMESTER });

      setReturnText("Semestre cadastrado com sucesso!");
    });
  }

  function saveSemester(semester, onSuccessSaved) {

    console.log(semester);

    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO semestres (usuario_id, name, materia1, materia2, materia3, materia4, materia5, finalizarsemestre, semestresatual) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [usuario.id, semester.name, semester.materia1, semester.materia2, semester.materia3, semester.materia4, semester.materia5,
        semester.finalizarsemestre, semester.semestresatual],
        (_, rs) => {
          console.log(`Semestre salvo com o ID: ${rs.insertId}`);
          onSuccessSaved(rs.insertId);
        },
        (_, err) => {
          console.log(err);
        }

      );
    });
  }


  const [selectedSubject, setSelectedSubject] = useState();

  const subjectsMonday = subjects.monday.subjects;
  const subjectsTuesday = subjects.tuesday.subjects;
  const subjectsWednesday = subjects.wednesday.subjects;
  const subjectsThursday = subjects.thursday.subjects;
  const subjectsFriday = subjects.friday.subjects;

  function recoverData() {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM semestres WHERE usuario_id = ?", [1], (_, rs) => {
        //setUsuarios(rs.rows._array);
        //setLoading(false);
        console.log(rs.rows._array);
      });
    });
  }

  return (
    <>
      <View>
        <TextInput
          style={styles.inputSemesterName}
          placeholder="Digite o semestre"
          label="Digite o semestre"
          onChangeText={name => setSemester({ ...semester, name })}>
        </TextInput>
      </View>
      <View>
        <Text style={styles.dayOfWeek}>Segunda</Text>
        <Picker selectedValue={selectedSubject} onValueChange={materia1 => setSemester({ ...semester, materia1 })}>
          {subjectsMonday.map(subject => {
            return <Picker.Item label={subject.name} value={subject.name} />;
          })}
        </Picker>
      </View>

      <View>
        <Text style={styles.dayOfWeek}>Terca</Text>
        <Picker selectedValue={selectedSubject} onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}>
          {subjectsTuesday.map(subject => {
            return <Picker.Item label={subject.name} value={subject.name} />;
          })}
        </Picker>
      </View>
      <View>
        <Text style={styles.dayOfWeek}>Quarta</Text>
        <Picker selectedValue={selectedSubject} onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}>
          {subjectsWednesday.map(subject => {
            return <Picker.Item label={subject.name} value={subject.name} />;
          })}
        </Picker>
      </View>
      <View>
        <Text style={styles.dayOfWeek}>Quinta</Text>
        <Picker selectedValue={selectedSubject} onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}>
          {subjectsThursday.map(subject => {
            return <Picker.Item label={subject.name} value={subject.name} />;
          })}
        </Picker>
      </View>
      <View>
        <Text style={styles.dayOfWeek}>Sexta</Text>
        <Picker selectedValue={selectedSubject} onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}>
          {subjectsFriday.map(subject => {
            return <Picker.Item label={subject.name} value={subject.name} />;
          })}
        </Picker>
      </View>



      {/*  
     <SelectSubjects dayOfWeek="Segunda-feira" subjectsOfWeek={subjectsMonday} />
      <SelectSubjects dayOfWeek="Terça-feira" subjectsOfWeek={subjectsTuesday} />
      <SelectSubjects dayOfWeek="Quarta-feira" subjectsOfWeek={subjectsWednesday} />
      <SelectSubjects dayOfWeek="Quinta-feira" subjectsOfWeek={subjectsThursday} />
      <SelectSubjects dayOfWeek="Sexta-feira" subjectsOfWeek={subjectsFriday} /> */}

      <View style={styles.currentSemester}>
        <Text>Semestre Atual?</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Button style={styles.btnSave} mode="contained" color="green" onPress={() => recoverData()}>
        Salvar Semestre
      </Button>

    </>
  );
}

const styles = StyleSheet.create({
  currentSemester: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputSemesterName: {
    height: 50,
    fontSize: 18,
    margin: 5,
    lineHeight: 45,
    marginBottom: 10,
  },
  btnSave: {
    marginTop: 10,
    width: "50%",
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
  },

  dayOfWeek: {
    fontSize: 18,
    marginLeft: 10,
  },
});
