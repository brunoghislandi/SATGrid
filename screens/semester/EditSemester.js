import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, TextInput, Switch } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";

import subjects from "./mocks/subjects.json";

import openDB from "../../db";

import { useUsuario } from "../../context/UsuarioContext";

const db = openDB();

function SelectSubjects({ subjectsOfWeek, dayOfWeek, func }) {

  const [selectedSubject, setSelectedSubject] = useState();
  return (
    <View>
      <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      <Picker
        selectedValue={selectedSubject}
        style={styles.inputDropdown}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedSubject(itemValue)
          try {
            func(itemValue)
          }
          catch { }
        }}>
        {subjectsOfWeek.map(subject => {
          return <Picker.Item label={subject.name} value={subject.name} />;
        })}
      </Picker>
    </View>
  );
}

export default function EditSemester({ navigation }) {
  const { usuario } = useUsuario();
  const [showIt, setShowIt] = useState(false);
  const [returnText, setReturnText] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [subjectsMonday, setMonday] = useState(subjects.monday.subjects);
  const [subjectsTuesday, setTuesday] = useState(subjects.tuesday.subjects);
  const [subjectsWednesday, setWednesday] = useState(subjects.wednesday.subjects);
  const [subjectsThursday, setThursday] = useState(subjects.thursday.subjects);
  const [subjectsFriday, setFriday] = useState(subjects.friday.subjects);

  async function valida(arr, diaSemana, func) {
    var newArr = [];
    await db.transaction(tx => {
      for (i = 0; i < (arr.length - 1); i++) {
        /* Checa se a matéria tem pré-requisito */
        if (arr[i].req != "") {
          /* Checa se já foi feito algum semestre com a matéria que é requisito */
          let req = arr[i].req;
          let cont = i;
          tx.executeSql(`SELECT * FROM semestres WHERE usuario_id = ? AND ` + diaSemana + ` = ?`, [usuario.id, req], (_, rs) => {
            if (rs.rows.length > 0) {
              newArr.push(arr[cont])
            }
          });
        } else {
          newArr.push(arr[i])
        }
      }
      func(newArr)
    });
  }

  const [semestre, setSemester] = useState("");
  const [mon, setmon] = useState(subjects.monday.subjects[0].name);
  const [tue, settue] = useState(subjects.tuesday.subjects[0].name);
  const [wed, setwed] = useState(subjects.wednesday.subjects[0].name);
  const [thu, setthu] = useState(subjects.thursday.subjects[0].name);
  const [fri, setfri] = useState(subjects.friday.subjects[0].name);

  function save() {
    if (!semestre) {
      setShowIt(true);
      setReturnText("Favor, informe o semestre.");
    } else {
      setShowIt(false);
      saveSemester()
    }
  }

  function saveSemester() {

    console.log(semestre);

    db.transaction(tx => {
      tx.executeSql("SELECT * FROM semestres WHERE name = ? and usuario_id = ?", [semestre, usuario.id], (_, rs) => {
        /* checa se já existe um semestre com aquele name*/
        if (rs.rows.length === 0) {
          tx.executeSql(
            "INSERT INTO semestres (usuario_id, name, materia1, materia2, materia3, materia4, materia5, semestresatual) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            [usuario.id, semestre, mon, tue, wed, thu, fri, isEnabled],
            (_) => {
              canIdoit();
              setShowIt(true);
              setReturnText("Semestre salvo com sucesso.");
            }
          );
        } else {
          setShowIt(true);
          setReturnText("Semestre já existente.");
        }
      });
    });
  }

  function canIdoit() {
    valida(subjects.monday.subjects, "materia1", setMonday)
    valida(subjects.tuesday.subjects, "materia2", setTuesday)
    valida(subjects.wednesday.subjects, "materia3", setWednesday)
    valida(subjects.thursday.subjects, "materia4", setThursday)
    valida(subjects.friday.subjects, "materia5", setFriday)
  }

  useEffect(() => {
    canIdoit()
  }, []);

  navigation.addListener("focus", () => {
    setShowIt(false);
  });

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            mode="outlined"
            label="Ano / Semestre"
            placeholder="2022/1"
            autoCapitalize="none"
            activeOutlineColor="navy"
            value={semestre}
            style={styles.inputSemesterName}
            onChangeText={e => setSemester(e)}
          />
          <SelectSubjects
            dayOfWeek="Segunda-feira"
            label="Segunda-feira"
            subjectsOfWeek={subjectsMonday}
            func={setmon}
          />
          <SelectSubjects
            dayOfWeek="Terça-feira"
            subjectsOfWeek={subjectsTuesday}
            func={settue}
          />
          <SelectSubjects
            dayOfWeek="Quarta-feira"
            subjectsOfWeek={subjectsWednesday}
            func={setwed}
          />
          <SelectSubjects
            dayOfWeek="Quinta-feira"
            subjectsOfWeek={subjectsThursday}
            func={setthu}
          />
          <SelectSubjects
            dayOfWeek="Sexta-feira"
            subjectsOfWeek={subjectsFriday}
            func={setfri}
          />
          <View style={styles.currentSemester}>
            <Text style={{ fontSize: 16, marginRight: 5 }}>Semestre Atual</Text>
            <Switch
              trackColor={{ false: "#767577", true: "green" }}
              thumbColor={isEnabled ? "navy" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {!!showIt ? <Text style={styles.alertText}>{returnText}</Text> : null}
          <Button style={styles.btnSave} mode="contained" color="navy" onPress={() => save()}>
            Salvar Semestre
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  currentSemester: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  inputSemesterName: {
    height: 50,
    fontSize: 13,
    lineHeight: 45,
    marginBottom: 25
  },
  btnSave: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    justifyContent: "center"
  },
  dayOfWeek: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "gray",
    marginTop: 10
  },
  alertText: {
    alignSelf: "center",
    color: "crimson",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 10
  },
  inputDropdown: {
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginTop: 5
  }
});