import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
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
        onValueChange={(itemValue, itemIndex) => {
          setSelectedSubject(itemValue)
          try{
            func(itemValue)
          } 
          catch{}
        }}
        >
        {subjectsOfWeek.map(subject => {
          return <Picker.Item label={subject.name} value={subject.name} />;
        })}
      </Picker>
    </View>
  );
}

export default function EditSemester() {
  // agora que temos o UsuarioContext podemos
  // recuperar o usuário logado deste local
  // e não precisar mais nos preocupar com recebe-lo
  // de um parametro vindo da navegação
  const { usuario } = useUsuario();
  const [showIt, setShowIt] = useState(false);
  const [returnText, setReturnText] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const subjectsMonday = subjects.monday.subjects;
  const subjectsTuesday = subjects.tuesday.subjects;
  const subjectsWednesday = subjects.wednesday.subjects;
  const subjectsThursday = subjects.thursday.subjects;
  const subjectsFriday = subjects.friday.subjects;

/* Validações ainda não implementadas
async function valida(arr,diaSemana){
    var newArr = [];
    await db.transaction(tx => {
      console.log("aqui")
      for(i=0;i<(arr.length-1);i++){

        /* Checa se a matéria tem pré-requisito 
        if(arr[i].req != ""){

          /* Checa se já foi feito algum semestre com a matéria que é requisito 
          let req = arr[i].req;
          let cont = i;
          tx.executeSql(`SELECT * FROM semestres WHERE usuario_id = ? AND ` + diaSemana + ` = ?`, [1, req], (_, rs) => {
            if (rs.rows.length > 0) {
              newArr.push(arr[cont])
            }
          });
        }else{
         /* newArr.push(arr[i])
        }
      }
    });
    console.log(newArr)
  }
*/

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
              setShowIt(true);
              setReturnText("Semestre salvo com sucesso.");
            }
          );
        } else {
          setShowIt(true);
          setReturnText("Semestre já existe.");
        }
      });
    });
  }

  return (
    <>
      <TextInput 
        style={styles.inputSemesterName} 
        placeholder="Digite o semestre" 
        label="Digite o semestre"
        value={semestre}
        onChangeText={e => setSemester(e)}></TextInput>

      <SelectSubjects 
          dayOfWeek="Segunda-feira"
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
        <Text>Semestre Atual?</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {!!showIt ? <Text style={styles.alertText}>{returnText}</Text> : null}
      <Button style={styles.btnSave} mode="contained" color="green" onPress={() => save()}>
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
  alertText: {
    alignSelf: "center",
    color: "crimson",
    fontWeight: "bold",
    fontSize: 14,
  },
});
